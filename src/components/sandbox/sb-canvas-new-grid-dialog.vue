<template>
  <v-dialog :value="makeNewGrid" persistent>
    <v-card>
      <v-form ref="form" @submit.prevent="onSubmit">
        <v-card-title class="title">
          Create a new grid!
        </v-card-title>
        <v-card-text>
          <v-flex>
            <v-text-field
              box
              required
              label="Name"
              hint="Give your new blank grid a name you'll remember so you can come back and work on it later."
              persistent-hint
              :rules="nameRules"
              v-model="name"
            ></v-text-field>
          </v-flex>
          <v-flex mt-4>
            <v-text-field
              box
              type="number"
              label="Rows"
              hint="How many rows should this grid have?"
              persistent-hint
              :rules="rowsRules"
              v-model.number="rows"
            ></v-text-field>
          </v-flex>
          <v-flex mt-4>
            <v-text-field
              box
              type="number"
              label="Columns"
              hint="How many columns should this grid have?"
              persistent-hint
              :rules="colsRules"
              v-model.number="cols"
            ></v-text-field>
          </v-flex>
          
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onClose">Nevermind</v-btn>
          <v-btn type="submit">Create</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Mutation, Action } from 'vuex-class'

@Component
export default class SBCanvasNewGridDialog extends Vue {
  @Prop(Boolean) makeNewGrid!: boolean

  name: string = ''
  nameRules = [(v: string) => !!v || 'Name is required']
  rows = 12
  rowsRules = [(v: number) => (!!v && v <= 40 && v >= 10) || 'There must be between 10 and 40 rows']
  cols = 12
  colsRules = [(v: number) => (!!v && v <= 40 && v >= 10) || 'There must be between 10 and 40 columns']

  @Action('grid/GENERATE_NEW_GRID') GENERATE_NEW_GRID!: Function

  onClose() {
    this.$emit('update:makeNewGrid', false);
  }

  onSubmit() {
    if (this.$refs.form.validate()) {
      const { name, rows, cols } = this;
      this.GENERATE_NEW_GRID({ name, rows, cols });
      this.onClose();
    }
  }


}
</script>
