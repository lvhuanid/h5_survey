<template>
  <div class="bg-white border rounded-lg px-8 py-8 mx-auto max-w-2xl">
    <h2 class="text-2xl font-medium mb-4">Survey</h2>
    <form @submit.prevent="buttonClick">
      <div v-for="item, index in items" :key="item.id" class="mb-4">
        <div class="mb-4">
          <label :for="item.id" class="block text-gray-700 font-medium mb-2">{{ index + 1 }}.{{ item.label }}{{
            item.type === "options" ? "【多选题】" : "" }}</label>
          <template v-if="item.type === 'input'">
            <input type="text" :id="item.id" :name="item.id"
              class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required>
          </template>
          <template v-if="item.type === 'select'">
            <select :id="item.id" :name="item.id"
              class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required>
              <option v-for="select in item.selects" :key="select.id" :value="select.value">{{ select.value }}</option>
            </select>
          </template>
          <template v-if="item.type === 'options'">
            <div class="mb-4">
              <div class="flex flex-wrap flex-col -mx-2">
                <div v-for="select in item.selects" :key="select.id" class="px-2">
                  <label :for="select.value" class="block text-gray-700 font-medium mb-2">
                    <input type="checkbox" :name="item.id" :value="select.value" class="mr-2">{{
                      select.value }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <template v-if="item.type === 'option'">
            <div class="mb-4">
              <div v-for="select in item.selects" :key="select.id" class="flex flex-wrap flex-col -mx-2">
                <div class="px-2">
                  <label :for="select.value" class="block text-gray-700 font-medium mb-2">
                    <input type="radio" :name="item.id" :value="select.value" class="mr-2">{{
                      select.value }}
                  </label>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="mb-4">
        <label for="message" class="block text-gray-700 font-medium mb-2">Message</label>
        <textarea id="message" name="message"
          class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
          rows="5"></textarea>
      </div> -->
      <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
      </div>

    </form>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import items from "./data/table.json"
import { initAxios, apiGet1 } from "./api/api.js"
import { onMounted } from 'vue';


const buttonClick = () => {
  const formData = new FormData(event.target); // Get form data
  const data = {};

  formData.forEach((value, key) => {
    // If the key already exists, initialize it as an array (if not already)
    if (data[key]) {
      // Ensure it is an array
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]]; // Convert existing value to an array
      }
      // Push the new value into the array
      data[key].push(value);
    } else {
      // If the key doesn't exist, just set it
      data[key] = value;
    }
  });
  console.log(data); // Log the serialized form data
}
onMounted(async () => {
  await initAxios();
  // const c = await apiGet1({ a: 1 })
  console.log(123)

});
</script>
// {
// "id": "Name",
// "label": "Name",
// "type": "input"
// },
// {
// "id": "s1",
// "label": "Gender",
// "type": "select",
// "selects": [
// { "id": "color-red", "name": "color", "value": "red" },
// { "id": "color-blue", "name": "color", "value": "blue" },
// { "id": "color-gree", "name": "color", "value": "gree" }
// ]
// },
// {
// "id": "color",
// "label": "What is your favorite color?",
// "type": "option",
// "selects": [
// { "id": "color-red", "name": "color", "value": "red" },
// { "id": "color-blue", "name": "color", "value": "blue" },
// { "id": "color-gree", "name": "color", "value": "gree" }
// ]
// },
// {
// "id": "animal",
// "label": "What is your favorite animal?",
// "type": "options",
// "selects": [
// { "id": "animal-cat", "name": "animal", "value": "cat" },
// { "id": "animal-dog", "name": "animal", "value": "dog" },
// { "id": "animal-bird", "name": "animal", "value": "bird" }
// ]
// },