export const parsePrice = {
  methods: {
    parsePrice(value) {
      return parseFloat(value)
        ? '$' + value
        : value;
    }
  }
};