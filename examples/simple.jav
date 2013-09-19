###
  TEST
###

object @test {
  # Settings
  -named

  # Properties
  .foo, .bar, .baz

  # Array
  array .qux {
    .one => '1', .two => '2'
  }
}
