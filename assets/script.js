var app = new Vue({
    el: '#app',
    data: {
        domians: [{
                "id": 1,
                "domain": "promokodus.com"
            },
            {
                "id": 2,
                "domain": "habr.com"
            }
        ],
        formObject: {
            "id": 1,
            "name": "MVideo",
            "slug": "mvideo",
            "is_show": true,
            "extenstion_data": [{
                    "domain_id": 1,
                    "name": "",
                    "slug": "",
                    "is_show": null
                },
                {
                    "domain_id": 2,
                    "name": "",
                    "slug": "",
                    "is_show": null
                }
            ]
        },
        selectedDomian: null,
        formName: "",
        formSlug: "",
        formIsShow: false
    },
    methods: {
        async sendForm() {
            let formData = new FormData()
            formData.append('name', this.formName);
            formData.append('slug', this.formSlug)
            formData.append('isShow', Number(this.formIsShow))
            try {
              let res = await fetch('http://localhost:3000/api/save', {
                method: 'POST',
                body: formData
            })
            } catch (error) {
              console.log(error);
            }
           
        }
    },
    watch: {
        selectedDomian: function(val) {
            if (val === 1) {

                this.formObject.extenstion_data[0].name = this.domians[0].domain
                this.formObject.extenstion_data[0].slug = this.domians[0].slug
                this.formObject.extenstion_data[0].isShow = true

                this.formName = this.domians[0].domain
                this.formSlug = this.domians[0].domain
                this.formIsShow = true

            } else if (val === 2) {

                this.formObject.extenstion_data[1].name = this.domians[1].domain
                this.formObject.extenstion_data[1].slug = this.domians[1].slug
                this.formObject.extenstion_data[1].isShow = true

                this.formName = this.domians[1].domain
                this.formSlug = this.domians[1].domain
                this.formIsShow = true
            }
        }
    },
    mounted() {
        if (!this.selectedDomian) {
            this.formObject.name = ""
            this.formObject.slug = ""
            this.formObject.isShow = true
        }
    },

})