<template>
    <div class="column is-centered notification is-primary">
        <h1 class="title">Edição de Usuário</h1>
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
                    <hr>
                    <button type="submit" class="button is-success" @click="update">Editar</button>
                </div>            
            </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    created() {
        var req = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        } 

        axios.get('http://localhost:80/user/'+this.$route.params.id, req).then(res => {
            this.name = res.data.name
            this.email = res.data.email
            this.id = res.data.id
            
        }).catch(error => {
            console.log(error.response)
            this.$router.push({name: 'Users'})
        })
    },
    data() {
        return {
            id: -1,
            name: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        update() {
            var req = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }

            axios.put('http://localhost:80/user',{
                id: this.id,
                name: this.name,
                email: this.email
                
            }, req).then(res => {
                this.$router.push({name: 'Users'})
                console.log(res.data.success)
            }).catch(error => {
                console.log(error)
                this.error = error
            })
        }
    }
}
</script>

<style scoped>

</style>