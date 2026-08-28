#!/usr/bin/env python3
import asyncio
import os
import edge_tts

VOICE = "vi-VN-HoaiMyNeural"

CLIPS = {
    # Animals & Counting
    "count_ducks_3": "Đố bé Sonic, trong hình có bao nhiêu chú vịt con nào?",
    "count_ducks_3_praise": "Đúng rồi! Có 3 chú vịt vàng kêu cạp cạp! Sonic giỏi quá!",
    "count_dogs_2": "Trong hình có bao nhiêu chú cún con đáng yêu nè bé?",
    "count_dogs_2_praise": "Chính xác! Có 2 chú cún con vẫy đuôi mừng bé nè!",
    "count_dogs_3": "Đố Sonic, có bao nhiêu chú chó ngồi thẳng hàng nè?",
    "count_dogs_3_praise": "Hoan hô! Có 3 chú chó con ngoan ngoãn!",
    "count_cats_2": "Có bao nhiêu chú mèo con kêu meo meo trong hình nè?",
    "count_cats_2_praise": "Đúng rồi! Có 2 chú mèo con xinh xắn!",
    "count_rabbits_3": "Có bao nhiêu chú thỏ trắng tai dài trong hình vậy Sonic?",
    "count_rabbits_3_praise": "Tuyệt vời! Có 3 chú thỏ trắng nhảy tung tăng!",
    "count_elephant_1": "Trong hình có bao nhiêu chú voi con có vòi dài nè bé?",
    "count_elephant_1_praise": "Đúng rồi! Có 1 chú voi con dễ thương!",

    # Letters
    "letter_a": "Đố bé Sonic, đâu là chữ A nào?",
    "letter_a_name": "Chữ A",
    "letter_a_praise": "Đúng rồi! Đây là chữ A! Bé Sonic thông minh quá!",
    "letter_b": "Đố bé Sonic, đâu là chữ B nào?",
    "letter_b_name": "Chữ B",
    "letter_b_praise": "Chính xác! Đây là chữ B! Sonic giỏi quá!",
    "letter_c": "Đố bé Sonic, đâu là chữ C nào?",
    "letter_c_name": "Chữ C",
    "letter_c_praise": "Hoan hô! Đây là chữ C! Bé Sonic giỏi lắm!",
    "letter_o": "Đố bé Sonic, đâu là chữ O tròn xoe nào?",
    "letter_o_name": "Chữ O",
    "letter_o_praise": "Đúng rồi! Chữ O tròn như quả trứng gà! Sonic giỏi quá!",
    "letter_d": "Đố bé Sonic, đâu là chữ D nào?",
    "letter_d_name": "Chữ D",
    "letter_d_praise": "Tuyệt vời! Đây là chữ D! Sonic nhớ bài siêu quá!",

    # Shapes
    "shape_circle": "Đố bé Sonic, khối gỗ màu đỏ này là hình gì nè?",
    "shape_circle_name": "Hình Tròn",
    "shape_circle_praise": "Đúng rồi! Đây là Hình Tròn tròn xoe không có góc!",
    "shape_square": "Khối gỗ màu xanh này có bốn cạnh bằng nhau là hình gì nè?",
    "shape_square_name": "Hình Vuông",
    "shape_square_praise": "Chính xác! Đây là Hình Vuông bốn cạnh đều nhau!",
    "shape_triangle": "Hình có ba góc nhọn như chiếc nón này là hình gì nè bé?",
    "shape_triangle_name": "Hình Tam Giác",
    "shape_triangle_praise": "Tuyệt vời! Đây là Hình Tam Giác ba góc nhọn!",

    # Colors
    "color_duck": "Chú vịt con này có bộ lông màu gì vậy bé Sonic?",
    "color_duck_praise": "Đúng rồi! Chú vịt con có bộ lông Màu Vàng tươi!",
    "color_apple": "Quả táo chín này có màu gì đỏ mọng nè bé?",
    "color_apple_praise": "Chính xác! Quả táo chín có Màu Đỏ rực rỡ!",
    "color_square": "Khối hình vuông này có màu gì nè bé Sonic?",
    "color_square_praise": "Hoan hô! Khối vuông có Màu Xanh Dương tươi mát!",
    "color_grape": "Chùm nho này có màu gì ngọt lịm nè bé?",
    "color_grape_praise": "Đúng rồi! Chùm nho chín có Màu Tím đậm đà!",

    # General
    "khen_thu_lai": "Bé Sonic thử lại một lần nữa nhé!",
    "khen_sao": "Ting ting! Tặng bé Sonic một ngôi sao vàng lấp lánh!",
    "animal_duck": "Con vịt",
    "animal_dog": "Con chó",
    "animal_cat": "Con mèo",
    "animal_rabbit": "Con thỏ",
    "animal_elephant": "Con voi"
}

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")

async def generate_missing():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for clip_id, text in CLIPS.items():
        out_path = os.path.join(OUTPUT_DIR, f"{clip_id}.mp3")
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            print(f"Skipping already generated: {clip_id}.mp3")
            continue
        for retry in range(3):
            try:
                print(f"Generating: {clip_id}.mp3...")
                communicate = edge_tts.Communicate(text, VOICE)
                await communicate.save(out_path)
                if os.path.getsize(out_path) > 500:
                    print(f"✓ OK: {clip_id}.mp3 ({os.path.getsize(out_path)} bytes)")
                    break
            except Exception as e:
                print(f"Retry {retry+1} for {clip_id}: {e}")
                await asyncio.sleep(1.0)
        await asyncio.sleep(0.4)

    print("Finished generating missing voice clips!")

if __name__ == "__main__":
    asyncio.run(generate_missing())
