array @foos {
  set .one %{
    return parseInt(node.value) * 2;
  %}

  set .two %{
    return parseInt(node.value) * 3;
  %}
}