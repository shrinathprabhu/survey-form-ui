<template>
  <v-container>
    <v-row class="justify-center">
      <v-col>
        <v-card flat :rounded="false">
          <v-card
            class="px-5 py-3"
            :color="themeColor"
            dark
            flat
            :class="form.description ? 'card-with-form-description' : ''"
          >
            <h4 class="text-h5">{{ form.title }}</h4>
          </v-card>
          <v-card
            class="px-5 py-3"
            flat
            outlined
            style="border-top-left-radius: 0; border-top-right-radius: 0"
            v-if="form.description"
          >
            <h6 class="text-subtitle-1">
              {{ form.description }}
            </h6>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.card-with-form-description {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>

<script>
import ThemeMixin from "../../mixins/theme-mixin";
export default {
  name: "response-body",
  props: ["form"],
  mixins: [ThemeMixin],
};
</script>