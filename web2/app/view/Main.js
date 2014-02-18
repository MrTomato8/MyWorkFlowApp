Ext.define('MyWorkFlowApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    id:'mycontainer',
    requires: [
        'MyWorkFlowApp.view.MyNestedList',
            'MyWorkFlowApp.view.MainTabPanel',
            'MyWorkFlowApp.view.item.Edit'
    ],
    config: {

        layout:'hbox',

        tabBarPosition: 'bottom',

        items: [
            {
                xtype:"maintabpanel" ,
                flex:1
            },
            {
                xtype:"itemeditpanel" ,
                id:'itemeditpanel',
                flex:1
//                ,html:'hello'
            }
        ],


        listeners:{
                    initialize:function (panel, eOpts)
                        {
        //                    debugger;
                            //newActiveItem.reload();
                            var orientation = Ext.Viewport.getOrientation();
                            //Ext.Msg.alert("Orientation",orientation);

                            if(orientation == 'portrait'){
                                var itemeditpanel = panel.query(".itemeditpanel")[0];
                                            panel.remove(itemeditpanel, false,false);
                            //                console.log(portraitPanel.getItems());
                            //                portraitPanel.add([screenLayout1,screenLayout2]);
                            //                this.getMyContainer().add([portraitPanel]);
                                        }
                        }
                }
    }
});
