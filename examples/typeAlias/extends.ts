type text = 'a' | 'b' | 'c'

type textE<T> = T extends text ? true : false

type text1 = textE<'a'> // true
type text2 = textE<'f'> // false
