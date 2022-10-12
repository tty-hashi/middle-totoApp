// export const statusList = { 'noStarted': '未着手', 'inProgress': '進行中', 'done': '完了' }
export type TodoType = {
  id: string;
  content: string;
  createdAt: string;
  //文字列リテラル
  status: 'noStarted' | 'inProgress' | 'done';
}

export const selectList = [
  { id: 'noStarted', value: ' 未着手' },
  { id: 'inProgress', value: '実行中' },
  { id: 'done', value: '完了' }
]