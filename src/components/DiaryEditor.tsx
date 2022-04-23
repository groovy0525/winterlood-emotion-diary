import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DiaryDispatchContext } from "../App"
import { Emotion } from "../types"
import { getStringDate } from "../util/date"
import EmotionItem from "./EmotionItem"
import MyButton from "./MyButton"
import MyHeader from "./MyHeader"

const emotionList: Emotion[] = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descrpit: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descrpit: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descrpit: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descrpit: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descrpit: "끔찍함",
  },
]

function DiaryEditor() {
  const navigate = useNavigate()
  const { onCreate } = useContext(DiaryDispatchContext)!

  const [date, setDate] = useState<string>(() => getStringDate(new Date()))
  const [emotion, setEmotion] = useState<number>(3)
  const [content, setContent] = useState<string>("")
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const handleClickEmote = (emotion_id: number) => setEmotion(emotion_id)

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current?.focus()
      return
    }

    onCreate({
      date: Date.now(),
      content,
      emotion,
    })
    navigate("/", { replace: true })
  }

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText="새 일기쓰기"
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((emotionItem) => (
              <EmotionItem
                key={emotionItem.emotion_id}
                emotion={emotionItem}
                isSelected={emotionItem.emotion_id === emotion}
                onClick={handleClickEmote}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘은 어땠나요"
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text="취소하기" onClick={() => navigate(-1)} />
            <MyButton text="작성완료" type="positive" onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor
