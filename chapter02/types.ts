export type ListNodeValue = string | number | null

export type ListNode<T> = {
  value: T | null
  next?: ListNode<T>
}
