object @foo {
  -copy

  set .bar, .qux

  object .inner
  array @outerArray {
    .'1' => 'one'
    .'2' => 'two'
  }
}