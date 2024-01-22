<template>
    <v-row>
        <v-col cols="12" md="8">
            <v-form>
                <v-card class="card" flat>
                    <v-card-title>Setup Formula</v-card-title>
                    <v-card-text>
                        <v-row no-gutters v-for="i in formLoop" :key="i.id">
                            <v-col cols="12" :md="parseInt(i.id) > 0 ? 6 : 8">
                                <v-select dense outlined :items="dataVariable" v-model="i.variable" label="Pilih Variable"
                                    required :rules="[v => !!v || 'Item is required']" class="mb-input"
                                    item-text="variable_name" item-value="variable_name"></v-select>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-select dense outlined :items="tools" v-model="i.operator" label="Operator" required
                                    :rules="[v => !!v || 'Item is required']" class="mb-input"></v-select>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-btn depressed outlined block @click="addSetupVariable" tile height="40">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" md="2" v-if="parseInt(i.id) > 0">
                                <v-btn depressed outlined block @click="deleteSetupVariable(i.id)" tile height="40">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn depressed :loading="loading" color="primary" block @click="submit">
                            Submit
                        </v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-card-text v-if="dataFormula.length > 0">
                        <v-alert border="top" colored-border type="info" elevation="1">
                            <p>
                                <strong v-for="(i, index) in dataFormula" :key="index">
                                    {{ i.variable_name }} {{ i.operator }}
                                </strong>
                                <v-btn class="ma-2" x-small outlined color="primary" @click="truncateFormula(dataFormula[0].id)">
                                    delete formula
                                </v-btn>
                            </p>
                        </v-alert>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-col>
        <v-col cols="12" md="4">
            <v-form>
                <v-card class="card" flat>
                    <v-card-title>Setup Variable</v-card-title>
                    <v-card-text>
                        <v-text-field dense outlined label="Variable name" required
                            :rules="[v => !!v || 'Item is required']" v-model="formVariable.variable_name"></v-text-field>
                        <v-text-field dense outlined label="Bobot value" required :rules="[v => !!v || 'Item is required']"
                            type="number" suffix="%" v-model="formVariable.bobot"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn depressed :loading="loading" color="primary" block @click="submitVariable">
                            Submit
                        </v-btn>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-chip class="ma-2" color="primary" outlined v-for="(i, index) in dataVariable" :key="index"
                                close @click:close="deleteVariableItem(i.id)">
                                {{ i.variable_name }}
                                <strong class="ml-1">{{ i.bobot }}%</strong>
                            </v-chip>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data: () => ({
        loading: false,
        formVariable: {
            variable_name: '',
            bobot: 0,
        },
        formLoop: [
            {
                id: '0',
                variable: '',
                operator: '',
            }
        ],
        tools: ['+', ':', '-', '=', 'x', 'fix',],
        dataVariable: [],
        dataFormula: [],
    }),
    mounted() {
        this.getVariable()
        this.getFormula()
    },
    methods: {
        ...mapActions('summary_gaji', ['indexVariable', 'storeVariable', 'deleteVariable']),
        ...mapActions('summary_gaji', ['indexFormula', 'storeFormula', 'deleteFormula']),
        getVariable() {
            this.indexVariable().then((res) => {
                this.dataVariable = res.data
            })
        },
        getFormula() {
            this.indexFormula().then((res) => {
                this.dataFormula = res.data
            })
        },
        addSetupVariable() {
            let idset = this.formLoop.length - 1
            this.formLoop.push({
                id: `${++idset}`,
                variable: '',
                operator: '',
            })
        },
        deleteVariableItem(id) {
            this.deleteVariable(id).then((res) => {
                this.$swal(
                    res.msg,
                    res.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                    res.msg
                )
                this.getVariable()
            })
        },
        deleteSetupVariable(e) {
            this.formLoop.splice(this.formLoop.indexOf(e), 1)
        },
        submitVariable() {
            this.storeVariable(this.formVariable).then((res) => {
                this.$swal(
                    res.msg,
                    res.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                    res.msg
                )
                this.getVariable()
            })
        },
        submit() {
            const arr = []
            this.formLoop.forEach(el => {
                arr.push({
                    variable_name: el.variable,
                    operator: el.operator
                })
            });
            if (arr.length > 0)
                this.storeFormula({ post: arr }).then((res) => {
                    this.$swal(
                        res.msg,
                        res.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                        res.msg
                    )
                    this.getFormula()
                })
        },
        truncateFormula(id){
            this.deleteFormula(id).then((res)=>{
                this.$swal(
                    res.msg,
                    res.status === true ? 'Data berhasil ditambahkan' : 'Data gagal ditambahkan',
                    res.msg
                )
                this.getFormula()
            })
        }
    }
}
</script>