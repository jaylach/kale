###
  TEST
###

object @test {
  # Settings
  :named = false
  :copy = no

  # Properties
  .foo, .bar, .baz

  # Array
  array .qux {
    .one => '1', .two => '2'
  }
}
