export type SinglyLinkedListNode<T> = {
  value: T
  next?: SinglyLinkedListNode<T>
}

export class SinglyLinkedList<T> {
  public length: number
  private head?: SinglyLinkedListNode<T>
  private tail?: SinglyLinkedListNode<T>
  constructor() {
    this.length = 0
    this.head = this.tail = undefined
  }

  prepend(value: T): void {
    const node: SinglyLinkedListNode<T> = { value }
    this.length++
    if (!this.head) {
      this.head = this.tail = node
      return
    }

    node.next = this.head
    this.head = node
  }
  insertAt(value: T, idx: number): void {
    if (idx === 0) return this.prepend(value)
    if (idx === this.length - 1) return this.append(value)
    const curr = this.getNode(idx)
    if (!curr) return
    const node: SinglyLinkedListNode<T> = { value }
    this.length++

    node.next = curr.next
    curr.next = node
    node.value = curr.value
    curr.value = value
  }
  append(value: T): void {
    const node: SinglyLinkedListNode<T> = { value }
    this.length++
    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    this.tail.next = node
    this.tail = node
  }
  remove(value: T): T | undefined {
    let curr = this.head
    for (let i = 0; curr && i < this.length; i++) {
      if (curr.value === value) return this.removeAt(i)
      curr = curr.next
    }
    return undefined
  }
  get(idx: number): T | undefined {
    return this.getNode(idx)?.value
  }
  removeAt(idx: number): T | undefined {
    const curr = this.getNode(idx)
    if (!curr) return undefined
    const out = curr.value
    this.length--

    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    if (curr === this.head) this.head = this.head.next
    if (curr === this.tail) this.tail = this.getNode(idx - 1)
    if (curr.next === this.tail) this.tail = curr
    if (curr.next) {
      curr.value = curr.next.value
      curr.next = curr.next.next
    }
    return out
  }

  private getNode(idx: number): SinglyLinkedListNode<T> | undefined {
    let curr = this.head
    for (let i = 0; i < idx && curr; i++) {
      curr = curr.next
    }
    return curr
  }

  cloneList(): SinglyLinkedList<T> {
    const out = new SinglyLinkedList<T>()
    let curr = this.head
    while (curr) {
      out.append(curr.value)
      curr = curr.next
    }
    return out
  }

  printList(): void {
    console.log(this.getPrintList())
  }

  getPrintList(): T[] {
    const out: T[] = []
    let curr = this.head
    for (let i = 0; i < this.length && curr; i++) {
      out.push(curr.value)
      curr = curr.next
    }

    return out
  }

  removeAtHead(): T | undefined {
    if (!this.head) return undefined
    const out = this.head.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }
    this.head = this.head.next
    return out
  }

  removeAtTail(): T | undefined {
    if (!this.tail) return undefined
    const out = this.tail.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }
    this.tail = this.getNode(this.length - 1)
    return out
  }
}
