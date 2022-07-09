<template>
    <div>
        <form 
            accept-charset="UTF-8"
            v-on:submit.prevent="onSubmit()"
            method="POST"
        >
            <div class="form-line">
                <label> Название рецепта
                    <input type="text" v-model="title"  placeholder="Название">
                </label>
                <label> Создатель
                    <input type="text" v-model="creator" placeholder="Введите значение">
                </label>
                <label> Ингридиенты
                    <input type="text" v-model="ingredients" placeholder="Введите значение">
                </label>
                <label> Описание
                    <input type="text" v-model="text" placeholder="Введите значение">
                </label>
            </div>
            <v-btn class="submit-btn" type="submit">Отправить</v-btn>
        </form>
    </div>
</template>

<script>
export default {
  data() {
      return {
        title: '',
        creator: '',
        ingredients: '',
        text: '',
        calories: 1,
        category: [1]
    }
  },
  methods: {
      async onSubmit() {
        const data = {
            title: this.title,
            creator: this.creator,
            ingredients: this.ingredients,
            text: this.text,
            calories: this.calories,
            category: this.category,
        }  
        if (
            data.title === '' ||
            data.creator === '' ||
            data.ingredients === '' ||
            data.text === ''
        ) {
            alert('Заполните все поля формы')
        } else {
            await this.$store.dispatch('postForm/postForm', data);
            alert(JSON.stringify(this.$store.getters['postForm/answer']));
            await this.$store.dispatch('her/fetch');
        }
      }
  }
}
</script>


<style scoped>
    .submit-btn {
        background: #fefefe;
        padding: 10px;
        color: #000;
        border-radius: 10px;
    }

    select {
        background: #fff;
        padding: 5px;
        width: 100%;
        border-radius: 10px;
    }

    .form-line {
        margin-bottom: 15px
    }


    input {
        background: #dedede;
        color: #000;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 15px;
    }

    form {
        max-width: 500px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }
</style>
