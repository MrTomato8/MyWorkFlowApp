
Ext.define('MyWorkFlowApp.model.MyLocalStorageModel', {
    extend:'Ext.data.Model',

    requires:['Ext.data.identifier.Uuid'],

    config:{
        fields:[
            {
                name:'jsondata',
                type:'string'
            }
        ],
        identifier: 'uuid',
        proxy:{
            type:'localstorage',
            id:"petprojects",
//            batchActions:false,

            reader:{
                type:'json'
            },
            writer:{
                //                    root:'root'

            }
            //                ,create:Ext.emptyFn
            //                ,read:Ext.emptyFn
            //                ,update:Ext.emptyFn, destroy:function () {}
        }

    }
});