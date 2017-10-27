function saveFile() {
  // tinymce.init({
  //       selector: '#result',
  //       plugins: [
  //         "advlist autolink lists link image charmap print preview anchor",
  //         "searchreplace visualblocks code fullscreen fullpage",
  //         "insertdatetime media table contextmenu paste"
  //       ],
  //       toolbar: "insertfile undo redo | styleselect | bold italic | " +
  //         "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
  //         "link image"
  //     });
  // console.log("save");
  //     var contentDocument = tinymce.get('result').getDoc();
  //     var content = '<!DOCTYPE html>' + contentDocument.documentElement.outerHTML;
  //     var converted = htmlDocx.asBlob(content, {orientation: "Portrait"});
  //     saveAs(converted, 'result.docx');
      var doc = new DOCXjs();
      doc.text($('#result').html());
      doc.output('datauri');

}
