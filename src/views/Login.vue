<template>
    <div class="column is-centered notification is-info">
        <h1 class="title">Login de Usuário</h1>
        <hr>
            <div v-if="error != undefined" class="notification is-danger">
                        {{error}}
                        <p>{{msgLogin}}</p>
            </div>

            <div class="columns is-centered is-4">
                <div class="column is-half">
                    <p>E-mail</p>
                    <input type="email" placeholder="E-mail" class="input" v-model="email">
                    <p>Senha</p>
                    <input type="password" placeholder="Senha" class="input" v-model="password">
                    <hr>
                    <button type="submit" class="button is-success" @click="login">Entrar</button>
                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            password: '',
            email: '',
            error: undefined,
            msgLogin: undefined
        }
    },
    methods: {
        login() {
            axios.post('http://localhost:80/login', {
                email: this.email,
                password: this.password
            }).then(res => {
                    var dontLog = this.error = res.data.error

                if(dontLog) {
                    this.error = res.data.error
                } else {
                    this.error = res.data.success
                    this.msgLogin = 'Você está sendo redirecionado, aguarde...'

                    setTimeout(() => {
                        localStorage.setItem('token', res.data.token)
                        this.$router.push({name: 'Users'})
                    }, 5000)
                }
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