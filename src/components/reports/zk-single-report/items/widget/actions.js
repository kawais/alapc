export default {
  async service (jsThis, widget) {
    var para = {}
    if (widget && widget.value) {
      var dataReport = widget.value
      para.entityType = dataReport.entityType
      para.field = dataReport.field
      para.style = dataReport.style
      para.condition = dataReport.condition
    }
  }
}
