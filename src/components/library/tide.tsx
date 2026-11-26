import { useEffect, useRef, useState } from "react";

type TideNodes = {
  ctx: AudioContext;
  gain: GainNode;
  src: AudioBufferSourceNode;
  lfo: OscillatorNode;
};

export function TideToggle() {
  const [live, setLive] = useState(false);
  const nodes = useRef<TideNodes | null>(null);

  function silence() {
    const current = nodes.current;
    nodes.current = null;
    if (!current) return;
    const { ctx, gain, src, lfo } = current;
    const at = ctx.currentTime;
    gain.gain.cancelScheduledValues(at);
    gain.gain.setValueAtTime(gain.gain.value, at);
    gain.gain.linearRampToValueAtTime(0, at + 0.4);
    window.setTimeout(() => {
      src.stop();
      lfo.stop();
      void ctx.close();
    }, 460);
  }

  useEffect(() => () => silence(), []);

  function start() {
    const ctx = new AudioContext();
    const length = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      brown = brown * 0.992 + white * 0.08;
      data[i] = Math.max(-1, Math.min(1, brown * 2.2));
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 320;
    filter.Q.value = 0.7;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    lfo.start();
    gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.1);
    nodes.current = { ctx, gain, src, lfo };
  }

  return (
    <button
      type="button"
      aria-pressed={live}
      aria-label={live ? "Silenciar la marea" : "Oír la marea"}
      onClick={() => {
        if (live) {
          silence();
          setLive(false);
          document.querySelector(".tide-bar")?.setAttribute("data-live", "false");
          return;
        }
        start();
        setLive(true);
        document.querySelector(".tide-bar")?.setAttribute("data-live", "true");
      }}
      className={
        live
          ? "min-h-11 shrink-0 border border-wax bg-wax px-3 text-sm text-paper"
          : "min-h-11 shrink-0 border border-rule px-3 text-sm text-faint"
      }
    >
      {live ? "Silencio" : "Marea"}
    </button>
  );
}
