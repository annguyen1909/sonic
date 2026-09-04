#!/usr/bin/env python3
import asyncio
import os
import math
import struct
import random
import subprocess
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
TEMP_DIR = "/tmp/sonic_audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

VOICE = "vi-VN-HoaiMyNeural"

# 1. High quality Hoài My Voice clips
VOICE_CLIPS = {
    # Vehicle Intros & Quizzes
    "vehicle_firetruck": "Xe Cứu Hỏa màu đỏ chữa cháy!",
    "vehicle_police": "Xe Cảnh Sát tuần tra giữ an toàn!",
    "vehicle_ambulance": "Xe Cứu Thương chở bác sĩ và bệnh nhân!",
    "vehicle_airplane": "Máy Bay bay lượn trên bầu trời!",
    "vehicle_train": "Tàu Hỏa chạy trên đường ray tu tu xình xịch!",
    "vehicle_excavator": "Máy Xúc múc đất trên công trường!",

    "quiz_vehicle_firetruck": "Đố Sonic tìm xe cứu hỏa màu đỏ chữa cháy nè!",
    "quiz_vehicle_police": "Đố Sonic đâu là xe cảnh sát hú còi pí po?",
    "quiz_vehicle_ambulance": "Đố Sonic đâu là xe cấp cứu chở bác sĩ nè?",
    "quiz_vehicle_train": "Đố Sonic đâu là tàu hỏa tu tu xình xịch?",
    "quiz_vehicle_airplane": "Đố Sonic đâu là máy bay bay vù vù trên trời?",
    "quiz_vehicle_excavator": "Đố Sonic đâu là máy xúc múc đất rầm rầm?",

    "praise_firetruck": "Đúng rồi! Xe cứu hỏa phun nước dập lửa! Sonic giỏi quá!",
    "praise_police": "Chính xác! Xe cảnh sát bắt kẻ xấu giữ an toàn nè!",
    "praise_ambulance": "Hoan hô! Xe cứu thương chở bệnh nhân đi bệnh viện!",
    "praise_train": "Tuyệt vời! Đoàn tàu hỏa chạy dài thật dài!",
    "praise_airplane": "Đúng rồi! Máy bay sải cánh lượn trên mây xanh!",
    "praise_excavator": "Chính xác! Máy xúc khỏe khoắn múc đất xây nhà!",

    # Animal Sound Quizzes & Praises
    "quiz_sound_dog": "Ai đang sủa gâu gâu đấy nhỉ? Đố Sonic tìm bạn ấy nè!",
    "quiz_sound_cat": "Ai đang kêu meo meo đáng yêu đấy nhỉ?",
    "quiz_sound_duck": "Ai đang bơi dưới ao kêu cạp cạp đấy nhỉ?",
    "quiz_sound_elephant": "Ai có chiếc vòi dài đang rống thật to đấy nhỉ?",
    "quiz_sound_rooster": "Ai đang gáy ò ó o gọi bé dậy buổi sáng nè?",
    "quiz_sound_cow": "Ai đang kêu ùm bò cho bé ly sữa thơm nè?",

    "praise_sound_dog": "Đúng rồi! Bạn cún con sủa gâu gâu! Sonic giỏi quá!",
    "praise_sound_cat": "Chính xác! Bạn mèo con lông mượt kêu meo meo!",
    "praise_sound_duck": "Hoan hô! Bạn vịt vàng bơi lội cạp cạp!",
    "praise_sound_elephant": "Tuyệt vời! Bạn voi con có vòi dài thông minh!",
    "praise_sound_rooster": "Đúng rồi! Chú gà trống oai vệ gáy ò ó o!",
    "praise_sound_cow": "Chính xác! Bạn bò sữa hiền lành cho sữa ngon!"
}

def write_wav(filename, samples, sample_rate=44100):
    with open(filename, 'wb') as f:
        num_samples = len(samples)
        byte_rate = sample_rate * 2
        block_align = 2
        f.write(b'RIFF')
        f.write(struct.pack('<I', 36 + num_samples * 2))
        f.write(b'WAVE')
        f.write(b'fmt ')
        f.write(struct.pack('<IHHIIHH', 16, 1, 1, sample_rate, byte_rate, block_align, 16))
        f.write(b'data')
        f.write(struct.pack('<I', num_samples * 2))
        for s in samples:
            val = max(-32767, min(32767, int(s * 32767)))
            f.write(struct.pack('<h', val))

# Synthesis for SFX
def gen_firetruck_siren():
    wav_path = os.path.join(TEMP_DIR, "raw_firetruck.wav")
    sr = 44100
    duration = 3.2
    samples = []
    for i in range(int(sr * duration)):
        t = i / sr
        # Wail siren sweeping between 450Hz and 900Hz
        freq = 650 + 220 * math.sin(2 * math.pi * 0.65 * t)
        phase = 2 * math.pi * freq * t
        # Rich brassy harmonic overtone
        sample = 0.6 * math.sin(phase) + 0.25 * math.sin(2 * phase) + 0.15 * math.sin(3 * phase)
        # Gentle envelope
        env = 1.0
        if t < 0.2: env = t / 0.2
        elif t > duration - 0.3: env = (duration - t) / 0.3
        samples.append(sample * env * 0.75)
    write_wav(wav_path, samples, sr)
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_firetruck.mp3")
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_firetruck.mp3")

def gen_ambulance_siren():
    wav_path = os.path.join(TEMP_DIR, "raw_ambulance.wav")
    sr = 44100
    duration = 3.0
    samples = []
    for i in range(int(sr * duration)):
        t = i / sr
        # European Hi-Lo siren (700Hz and 950Hz alternating every 0.38s)
        cycle = int(t / 0.38) % 2
        freq = 950 if cycle == 0 else 700
        phase = 2 * math.pi * freq * t
        sample = 0.65 * math.sin(phase) + 0.25 * math.sin(3 * phase)
        env = 1.0
        if t > duration - 0.2: env = (duration - t) / 0.2
        samples.append(sample * env * 0.7)
    write_wav(wav_path, samples, sr)
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_ambulance.mp3")
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_ambulance.mp3")

def gen_train_sound():
    train_ogg = os.path.join(TEMP_DIR, "train.ogg")
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_train.mp3")
    try:
        url = "https://upload.wikimedia.org/wikipedia/commons/a/ab/Sound_of_American_Train_Horn_Nathan_Airchime_K5LA.ogg"
        subprocess.run(["curl", "-s", "-L", "-A", "SonicKids/1.0", url, "-o", train_ogg], check=True)
        subprocess.run(["ffmpeg", "-y", "-i", train_ogg, "-t", "3.2", "-af", "loudnorm", out_mp3], check=True, capture_output=True)
        print("✓ Created sfx_train.mp3 from Nathan Airchime K5LA")
        return
    except Exception as e:
        print("Fallback generating train horn:", e)

    # Fallback synthesizer: Airchime chord
    sr = 44100
    duration = 3.0
    samples = []
    chord = [311, 370, 415, 523] # D# minor chord
    for i in range(int(sr * duration)):
        t = i / sr
        sample = 0
        for f in chord:
            sample += 0.2 * math.sin(2 * math.pi * f * t)
        sample += 0.05 * (random.random() * 2 - 1) # air hiss
        env = 1.0 if t < 2.5 else (3.0 - t) / 0.5
        samples.append(sample * env * 0.8)
    wav_path = os.path.join(TEMP_DIR, "raw_train.wav")
    write_wav(wav_path, samples, sr)
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_train.mp3")

def gen_airplane_sound():
    wav_path = os.path.join(TEMP_DIR, "raw_airplane.wav")
    sr = 44100
    duration = 3.5
    samples = []
    # Jet engine thrust: low turbine roar + filtered pink noise
    b0, b1, b2 = 0, 0, 0
    for i in range(int(sr * duration)):
        t = i / sr
        white = random.random() * 2 - 1
        b0 = 0.99765 * b0 + white * 0.0990460
        b1 = 0.96300 * b1 + white * 0.2965164
        b2 = 0.57000 * b2 + white * 1.0526913
        pink = (b0 + b1 + b2 + white * 0.1848) * 0.1
        # Jet whine
        whine = 0.15 * math.sin(2 * math.pi * (450 + 200 * (t/duration)) * t)
        whine2 = 0.08 * math.sin(2 * math.pi * 1200 * t)
        sample = (pink * 0.7 + whine + whine2)
        env = 1.0
        if t < 0.5: env = t / 0.5
        elif t > duration - 0.5: env = (duration - t) / 0.5
        samples.append(sample * env * 0.8)
    write_wav(wav_path, samples, sr)
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_airplane.mp3")
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_airplane.mp3")

def gen_excavator_sound():
    wav_path = os.path.join(TEMP_DIR, "raw_excavator.wav")
    sr = 44100
    duration = 3.2
    samples = []
    for i in range(int(sr * duration)):
        t = i / sr
        # Heavy diesel motor: 15Hz chugging + low 75Hz rumble + metallic mechanical sound
        chug = 0.4 * (1 + math.sin(2 * math.pi * 14 * t))
        rumble = 0.4 * math.sin(2 * math.pi * 75 * t) * chug
        mech = 0.15 * math.sin(2 * math.pi * 220 * t) * chug
        noise = 0.1 * (random.random() * 2 - 1) * chug
        sample = rumble + mech + noise
        env = 1.0 if t < 2.8 else (3.2 - t) / 0.4
        samples.append(sample * env * 0.8)
    write_wav(wav_path, samples, sr)
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_excavator.mp3")
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_excavator.mp3")

def gen_duck_quack():
    wav_path = os.path.join(TEMP_DIR, "raw_duck.wav")
    sr = 44100
    duration = 2.4
    samples = []
    # 3 distinct quacks: t in [0.1, 0.4], [0.7, 1.0], [1.3, 1.6]
    for i in range(int(sr * duration)):
        t = i / sr
        sample = 0
        for start in [0.1, 0.7, 1.3]:
            if start <= t < start + 0.38:
                dt = t - start
                # Nasal duck formant (fundamental 280Hz -> 220Hz glide, harmonic rich)
                f0 = 280 - 60 * (dt / 0.38)
                phase = 2 * math.pi * f0 * dt
                # Formant synthesis
                s = (math.sin(phase) + 0.8 * math.sin(2*phase) + 0.6 * math.sin(3*phase) + 0.4 * math.sin(5*phase))
                # Envelope
                quack_env = math.sin(math.pi * (dt / 0.38)) ** 0.8
                sample += s * quack_env * 0.45
        samples.append(sample)
    write_wav(wav_path, samples, sr)
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_duck.mp3")
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_duck.mp3")

def gen_cow_moo():
    wav_path = os.path.join(TEMP_DIR, "raw_cow.wav")
    sr = 44100
    duration = 2.6
    samples = []
    # Cow moo: low 130Hz gliding to 155Hz then settling, warm bovine vowel formants
    for i in range(int(sr * duration)):
        t = i / sr
        if t < 0.2:
            f0 = 110 + 30 * (t / 0.2)
            env = t / 0.2
        elif t < 1.8:
            f0 = 140 + 10 * math.sin(2 * math.pi * 1.5 * t)
            env = 1.0
        else:
            f0 = 140 - 25 * ((t - 1.8) / 0.8)
            env = (2.6 - t) / 0.8
        phase = 2 * math.pi * f0 * t
        s = 0.5 * math.sin(phase) + 0.3 * math.sin(2 * phase) + 0.2 * math.sin(3 * phase) + 0.1 * math.sin(4 * phase)
        samples.append(s * max(0, env) * 0.75)
    write_wav(wav_path, samples, sr)
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_cow.mp3")
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_cow.mp3")

def gen_elephant_trumpet():
    out_mp3 = os.path.join(OUTPUT_DIR, "sfx_elephant.mp3")
    ogg_path = os.path.join(TEMP_DIR, "elephant.ogg")
    try:
        url = "https://upload.wikimedia.org/wikipedia/commons/1/17/Elephant_voice_-_trumpeting.ogg"
        subprocess.run(["curl", "-s", "-L", "-A", "SonicKids/1.0", url, "-o", ogg_path], check=True)
        subprocess.run(["ffmpeg", "-y", "-i", ogg_path, "-t", "2.8", "-af", "loudnorm", out_mp3], check=True, capture_output=True)
        print("✓ Created sfx_elephant.mp3 from trumpeting sample")
        return
    except Exception as e:
        print("Fallback synthesis for elephant:", e)
    sr = 44100
    duration = 2.5
    samples = []
    for i in range(int(sr * duration)):
        t = i / sr
        f0 = 350 + 200 * math.sin(math.pi * (t / duration))
        phase = 2 * math.pi * f0 * t
        # Brassy trumpet buzz
        s = 0.4 * math.sin(phase) + 0.3 * math.sin(2 * phase) + 0.2 * math.sin(4 * phase) + 0.1 * math.sin(6 * phase)
        env = math.sin(math.pi * (t / duration)) ** 0.5
        samples.append(s * env * 0.75)
    wav_path = os.path.join(TEMP_DIR, "raw_elephant.wav")
    write_wav(wav_path, samples, sr)
    subprocess.run(["ffmpeg", "-y", "-i", wav_path, "-af", "loudnorm", out_mp3], check=True, capture_output=True)
    print("✓ Created sfx_elephant.mp3")

async def gen_voices():
    print(f"Generating {len(VOICE_CLIPS)} Hoài My Neural voice clips...")
    for clip_id, text in VOICE_CLIPS.items():
        out_path = os.path.join(OUTPUT_DIR, f"{clip_id}.mp3")
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            print(f"Skipping already generated: {clip_id}.mp3")
            continue
        for retry in range(3):
            try:
                communicate = edge_tts.Communicate(text, VOICE)
                await communicate.save(out_path)
                if os.path.exists(out_path) and os.path.getsize(out_path) > 500:
                    print(f"✓ Created voice: {clip_id}.mp3")
                    break
            except Exception as e:
                print(f"Retry {retry+1} for {clip_id}: {e}")
                await asyncio.sleep(1.0)
        await asyncio.sleep(0.4)

async def main():
    print("Generating SFX...")
    gen_firetruck_siren()
    gen_ambulance_siren()
    gen_train_sound()
    gen_airplane_sound()
    gen_excavator_sound()
    gen_duck_quack()
    gen_cow_moo()
    gen_elephant_trumpet()

    await gen_voices()
    print("All SFX and Voices completed!")

if __name__ == "__main__":
    asyncio.run(main())
