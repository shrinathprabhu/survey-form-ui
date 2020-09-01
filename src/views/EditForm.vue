<template>
  <v-container>{{formDetails}}</v-container>
</template>

<script>
export default {
  name: "EditForm",
  data: () => ({
    formDetails: {},
  }),
  mounted: async function () {
    console.log(this.$route.params);
    let response = await this.axios.get(
      "http://localhost:3000/forms/" + this.$route.params.id
    );
    if (response.data) {
      this.formDetails = response.data;
    }
  },
};
</script>