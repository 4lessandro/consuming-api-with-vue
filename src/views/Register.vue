<template>
    <div class="column is-centered notification is-info">
        <h1 class="title">Registro de Usuário</h1>
        <hr>
            <div v-if="error != undefined" class="notification is-danger">
                        {{error}}
            </div>

            <div class="columns is-centered is-4">
                <div class="column is-half">
                    <p class="is-6">Nome</p>
                    <input type="text" placeholder="Nome do Usuário" class="input" v-model="name">
                    <p>E-mail</p>
                    <input type="email" placeholder="E-mail" class="input" v-model="email">
                    <p>Senha</p>
                    <input type="password" placeholder="Senha" class="input" v-model="password">
                    <hr>
                    <button type="submit" class="button is-success" @click="register">Criar Usuário</button>
                </div>            
            </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: '',
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        register() {
            axios.post('http://localhost:80/user', {
                name: this.name,
                email: this.email,
                password: this.password
            }).then(res => {
                this.$router.push({name: 'Home'})
                console.log(res.data.success)
            }).catch(error => {
                console.log(error)
                this.error = error.response.data.error
            })
        }
    }
}
</script>

<style scoped>

</style>