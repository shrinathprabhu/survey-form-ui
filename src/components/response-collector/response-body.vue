<template>
  <v-container>
    <v-row class="justify-center">
      <v-col>
        <v-card class="pa-5" :color="themeColor" dark>
          <h4 class="text-h5">Form Title</h4>
          <h6 class="text-subtitle-1">
            Form Description really long description very very logn such that
            this will go on next line if i dont stop writing it. Form
            Description really long description very very logn such that this
            will go on next line if i dont stop writing it.Form Description
            really long description very very logn such that this will go on
            next line if i dont stop writing itForm Description really long
            description very very logn such that this will go on next line if i
            dont stop writing it
          </h6>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ThemeMixin from "../../mixins/theme-mixin";
export default {
  name: "response-body",
  mixins: [ThemeMixin],
};
</script>