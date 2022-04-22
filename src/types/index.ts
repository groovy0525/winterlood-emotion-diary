export interface DiaryState {
  id: number
  content: string
  emotion: number
  date: number
}

export interface ReqDiary extends Omit<DiaryState, "id"> {}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
