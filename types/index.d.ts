declare module 'pdfkit/js/pdfkit.standalone' {
  import PDF from 'pdfkit'

  export = PDF
}

declare module '*.svg' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
