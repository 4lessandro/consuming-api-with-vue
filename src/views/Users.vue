<template>
    <div class="column is-centered notification is-danger">
        <h1 class="title">Painel Administrativo</h1>
        <hr>

        <div class="column is-centered">
            <div class="columns is-centered is-4">
                <table class="table is-bordered">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Cargo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.role | processRole}}</td>
                            <th><button class="button is-info">Editar</button> _
                            <button class="button is-danger">Deletar</button></th>
                        </tr>
                    </tbody>
                </table>

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

        axios.get('http://localhost:80/user', req,).then(res => {
            console.log(res.data)
            this.users = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    data()
    {
        return {
            users: []
        }
    }, 
    filters:  {
        processRole: function(value) {
            if(value === 0) {
                return 'Funcionário'
            } else if(value === 1) {
                return 'Administrador'
            }
        }
    }
        
}

</script>

<style scoped>

</style>