<template>
    <div class="column is-centered notification is-danger">
        <h1 class="title">Painel Administrativo</h1>
        <hr>

        <div class="column is-centered">
            <div v-if="deleted != undefined" class="notification is-success">
                        {{deleted}}
            </div>
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
                            <button class="button is-danger" @click="showDeleteModal(user.id)">Deletar</button></th>
                        </tr>
                    </tbody>
                </table>

                <div :class="{modal: true, 'is-active': showModal}">
                    <div class="modal-background"></div>
                    <div class="modal-card ">
                        <header class="modal-card-head">
                        <p class="modal-card-title">Você tem certeza que deseja excluir?</p>
                        <button class="delete" aria-label="close" @click="hideModal()"></button>
                        </header>
                        <footer class="modal-card-foot">
                        <button class="button is-danger" @click="deleteUser()">Deletar</button>
                        <button class="button" @click="hideModal()">Cancelar</button>
                        </footer>
                    </div>
                </div>

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
            this.users = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    data()
    {
        return {
            users: [],
            showModal: false,
            deleteUserId: -1,
            deleted: undefined
        }
    },
    methods: {
        hideModal() {
            this.showModal = false
        },
        showDeleteModal(id) {
            this.deleteUserId = id
            this.showModal = true
        },
        deleteUser() {
            var req = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
            axios.delete('http://localhost:80/user/'+this.deleteUserId, req).then(res => {
                this.deleted = res.data.success
                this.users = this.users.filter(u => u.id != this.deleteUserId)
            this.showModal = false
            }).catch(error => {
                console.log(error)
            })
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