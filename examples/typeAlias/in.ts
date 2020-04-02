enum ENUMTEST {
  name = 'name',
  age = 'age'
}

type inEnumTest = {
  [p in ENUMTEST]: number
}