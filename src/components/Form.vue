<template>
  <form name="email-form" @submit.prevent="onSubmit">
    <input type="email" v-model="email" required="true" />
    <input v-model="enterCompetition" value="yes" type="radio" name="enterCompetition" />
    <input v-model="enterCompetition" value="no" type="radio" name="enterCompetition" />
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <button type="submit">Submit</button>
  </form>
</template>
<script>
export default {
  data: () => ({
    email: null,
    enterCompetition: 'yes',
    selected: 'A'
  }),
  methods: {
    onSubmit (event) {
      debugger
      this.axios.post('http://demo7437963.mockable.io/validate', {
        email: this.email,
        enterCompetition: this.enterCompetition === 'yes'
      })
      debugger
      this.$emit('form-submitted')
    }
  }
}
</script>