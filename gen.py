import wave, struct, math, base64, json

def make_wav(filename, freq_env, duration):
    sample_rate = 8000
    n_samples = int(sample_rate * duration)
    with wave.open(filename, 'w') as w:
        w.setnchannels(1)
        w.setsampwidth(1)
        w.setframerate(sample_rate)
        
        for i in range(n_samples):
            t = float(i) / sample_rate
            f, a = freq_env(t)
            v = int(127.0 + 127.0 * a * math.sin(2.0 * math.pi * f * t))
            v = max(0, min(255, v))
            data = struct.pack('<B', v)
            w.writeframesraw(data)

make_wav('click.wav', lambda t: (800 - 500*(t/0.05), max(0, 1 - t/0.05)), 0.05)
make_wav('open.wav', lambda t: (300 + 300*(t/0.1), max(0, 1 - t/0.1)), 0.1)
make_wav('close.wav', lambda t: (600 - 300*(t/0.1), max(0, 1 - t/0.1)), 0.1)
make_wav('error.wav', lambda t: (150, max(0, 1 - t/0.4)), 0.4)
make_wav('startup.wav', lambda t: (200 + 600*(t/1.5), max(0, 1 - abs(t-0.5))), 1.5)

files = ['click', 'open', 'close', 'error', 'startup']
res = {}
for f in files:
    with open(f + '.wav', 'rb') as w:
        res[f] = 'data:audio/wav;base64,' + base64.b64encode(w.read()).decode('utf-8')

with open('sounds.json', 'w') as j:
    json.dump(res, j)
