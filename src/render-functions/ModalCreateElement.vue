<script>
export default {
  // Creamo un elemento a lo hard, con js vanilla
  name: 'ModalCreateElement',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
  },
  render(createElement) {
    return this.show
      ? createElement(
          'div',
          {
            class: 'modal',
          },
          [
            createElement(
              'p',
              {
                class: 'message',
              },
              this.message
            ),

            createElement(
              'button',
              {
                class: 'btn',
                on: {
                  click: this.clickCancelHandler,
                },
              },
              'Cancel'
            ),

            createElement(
              'button',
              {
                class: 'btn',
                on: {
                  click: this.clickOkHandler,
                },
              },
              'Ok'
            ),
          ]
        )
      : null
  },
  methods: {
    clickCancelHandler() {
      console.log('Click on Cancel')
    },
    clickOkHandler() {
      console.log('Click on Ok')
    },
  },
}
</script>
