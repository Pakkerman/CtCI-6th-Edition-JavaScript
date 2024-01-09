// Animal Shelter: An animal shelter, which holds only dogs and cats, operates on a strictly"first in, first out" basis. People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type). They cannot select which specific animal they would like. Create the data structures to maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog, and dequeueCat. You may use the built-in Linked L is t data structure.
// Hints: #22, #56, #63

import { SinglyLinkedList } from '../util/SinglyLinkedList'

type Species = 'cat' | 'dog'
type Animal = {
  species: Species
  checkInDate: number
}

export class AnimalShelter<T> {
  public length: number
  public dogCount: number
  public catCount: number
  private list: SinglyLinkedList<Animal>
  constructor() {
    this.length = 0
    this.dogCount = 0
    this.catCount = 0
    this.list = new SinglyLinkedList()
  }

  enqueue(species: Species): void {
    const checkInDate = new Date().getMilliseconds()
    this.list.append({ species, checkInDate })
    this.length++
    if (species === 'dog') this.dogCount++
    if (species === 'cat') this.catCount++
  }

  dequeueAny(): Animal | undefined {
    if (this.length === 0) return undefined
    const out = this.list.removeAt(0)
    if (!out) return undefined
    this.length--
    if (out.species === 'dog') this.dogCount--
    if (out.species === 'cat') this.catCount--

    return out
  }
  dequeueDog(): Animal | undefined {
    if (this.dogCount === 0) return undefined
    let idx = 0
    let curr = this.list.get(idx)
    while (curr && curr.species !== 'dog') {
      idx++
      curr = this.list.get(idx)
    }

    if (!curr) return undefined
    const out = this.list.removeAt(idx)
    this.length--
    this.dogCount--
    return out
  }
  dequeueCat(): Animal | undefined {
    if (this.catCount === 0) return undefined
    let idx = 0
    let curr = this.list.get(idx)
    while (curr && curr.species !== 'cat') {
      idx++
      curr = this.list.get(idx)
    }

    if (!curr) return undefined
    const out = this.list.removeAt(idx)
    this.length--
    this.catCount--
    return out
  }

  print(): void {
    this.list.printList()
  }
}
