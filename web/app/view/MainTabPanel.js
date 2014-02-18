

Ext.define("MyWorkFlowApp.view.MainTabPanel", {
    extend:'Ext.tab.Panel',
    id:'mytabpanel',
    alias : 'widget.maintabpanel',

    requires:[
        'Ext.TitleBar',
        'Ext.dataview.NestedList',
        'Ext.ActionSheet',
        'MyWorkFlowApp.store.MyJsonTreeStore',
//        'Ext.chart.Chart',
        'Ext.Video'
    ],



    config:{
        tabBarPosition:'bottom',

        items:[
            {
                xtype:'actionsheet',
                hidden:true,
                hideOnMaskTap:true,
                defaults: {
                                handler: function (btn, evt) {
//                                    debugger;
                                    var actionSheet = btn.ownerCt;
                                    actionSheet.hide();
                                } // handler
                            }, // defaults
                            items: [
                                {
                                    text: 'Edit'
                                    ,itemId:'edit'
//                                    ,iconCls:'compose'
                                }, {
                                    text: 'Delete'
                                    ,itemId:'delete'
                                    ,ui  : 'decline'
//                                    ,iconCls:'delete'
                                }, {
                                    text: 'Mark as Done'
                                    ,itemId:'markdone'
                                    ,ui  : 'confirm'
//                                    ,iconCls:'tick'
                                }
                            ]

            },
            {
                title:'Nested List View 2',
                iconCls:'organize',

                layout:'fit',

                items:[
                    /*{
                     docked: 'top',
                     xtype: 'titlebar',
                     title: 'Getting Started'
                     },*/
                    {
                        xtype:'toolbar',
                        hidden:true,
                        docked:'top',
                        defaults:{
                            iconMask:true
                        },
                        items:[
                            { xtype:'spacer' },

                            {
                                xtype:'button',
                                itemId:'edit',
                                iconCls:'compose'
                            },
                            {
                                xtype:'button',
                                itemId:'add',
                                iconCls:'add'
                            },
                            {
                                xtype:'button',
                                itemId:'delete',
                                iconCls:'delete'
                            },
                            {
                                xtype:'button',
                                itemId:'load',

                                iconCls:'refresh'
                            },
                            {
                                xtype:'button',
                                //   itemId:'load',
                                handler:function ()
                                    {
                                        window.location.reload();
                                    },
                                iconCls:'refresh'
                            },

                            { xtype:'spacer' }
                        ]
                    },
                    {
                        xtype:'mynestedlist',
//                        xtype:'nestedlist',

                        id:'MyJsonTree',
                        store:Ext.create('MyWorkFlowApp.store.MyJsonTreeStore'),
                        listConfig:{
                            itemTpl:new Ext.XTemplate(
                                    '<div>{[this.getHtml(values)]}</div>',
                                    //                                    '<div>{[this.getBattery(values)]}{priority} - {text}</div>',
                                    {
                                        // XTemplate configuration:
                                        //                                        disableFormats:true,
                                        // member functions:
                                        getBattery:function (values)
                                            {
                                                var node = values.myrec;
                                                var value = values.text;

                                                var numberOfChildNodes = node.childNodes.length;

                                                if (numberOfChildNodes === 0)
                                                    {
                                                        return "[]";
                                                    }
                                                else
                                                    {
                                                        var checkedCount = 0;

                                                        Ext.each(node.childNodes, function (n)
                                                        {
                                                            if (n.data.checked) checkedCount++;
                                                        });

                                                        var health = checkedCount / numberOfChildNodes;
                                                        if (health < 0.25)
                                                            { health = "[----]"}
                                                        else if (health < 0.50)
                                                            { health = "[X---]"}
                                                        else if (health < 0.75)
                                                            { health = "[XX--]"}
                                                        else if (health < 1)
                                                            { health = "[XXX-]"}
                                                        else if (health == 1)
                                                            { health = "[DONE]"}

                                                        return health;
                                                        //                                                        return health + " " + node.data.text;
                                                    }
                                            },
                                        getHtml:function (values)
                                            {

                                                var node = values.myrec;
                                                var value = values.text;

                                                var leftText = this.getBattery(values) + " " + node.data.text;


                                                var style;
                                                if (node.data.checked)
                                                    {
                                                        //                                                        debugger;
                                                        style = "color: gray;";
                                                    }
                                                else
                                                    {
                                                        style = "color: black;";
                                                    }


                                                return "<span style='" +
                                                        style +
                                                        "'>" + leftText + "</span>";
                                            }
                                    }
                            )
                        }
                    }
                ],

                reload:function ()
                    {
                        //debugger;
                    }
            },
            {
                title:'List View',
                iconCls:'star',

                layout:'fit',



                items:[
                    /*{
                     docked: 'top',
                     xtype: 'titlebar',
                     title: 'Getting Started'
                     },*/
                    {
                        xtype:'toolbar',
                        docked:'top',
                        defaults:{
                            iconMask:true
                        },
                        items:[
                            { xtype:'spacer' },

                            {
                                xtype:'button',
                                itemId:'add2',
                                iconCls:'add'
                            },
                            {
                                xtype:'button',
                                itemId:'edit2',
                                iconCls:'compose'
                            },
                            {
                                xtype:'button',
                                itemId:'markdone',
                                iconCls:'star'
                            },
                            {
                                xtype:'button',
                                itemId:'refreshList',
                                iconCls:'refresh'
                            },
                            { xtype:'spacer' }
                        ]
                    },
                    {
                        xtype:'list',

                        id:'MyJsonList',
                        store:'MyJsonStore'
//                        store:Ext.create('MyWorkFlowApp.store.MyJsonStore')

                        ,itemTpl:new Ext.XTemplate(
                                                '<div>{[this.getHtml(values)]}</div>',
                                                //                                    '<div>{[this.getBattery(values)]}{priority} - {text}</div>',
                                                {
                                                    // XTemplate configuration:
                                                    //                                        disableFormats:true,
                                                    // member functions:
                                                    getHtml:function (values)
                                                        {
//                                                            debugger;
                                                            var node = values.myrec;
                                                            var value = values.text;

                                                            var leftText = node.data.text;


                                                            var style;
                                                            if (node.data.checked)
                                                                {
                                                                    //                                                        debugger;
                                                                    style = "color: gray;";
                                                                }
                                                            else
                                                                {
                                                                    style = "color: black;";
                                                                }


                                                            return "<span style='" +
                                                                    style +
                                                                    "'>" + leftText + "</span>";
                                                        }
                                                }
                                        )
                    }
                ],

                reload:function ()
                    {


                    }
            },
            {
                title:'Dailies',
                iconCls:'star',

                layout:'fit',

                items:[
                    /*{
                     docked: 'top',
                     xtype: 'titlebar',
                     title: 'Getting Started'
                     },*/
                    {
                        xtype:'toolbar',
                        docked:'top',
                        defaults:{
                            iconMask:true
                        },
                        items:[
                            { xtype:'spacer' },

                            {
                                xtype:'button',
                                itemId:'add2',
                                iconCls:'add'
                            },
                            {
                                xtype:'button',
                                itemId:'edit2',
                                iconCls:'compose'
                            },
                            {
                                xtype:'button',
                                itemId:'markdone2',
                                iconCls:'star'
                            },
                            {
                                xtype:'button',
                                itemId:'refreshList2',
                                iconCls:'refresh'
                            },
                            { xtype:'spacer' }
                        ]
                    },
                    {
                        xtype:'list',

                        id:'MyJsonList2',
                        store:Ext.create('MyWorkFlowApp.store.MyJsonStore', {storeId:'MyJsonStore2'})
//                        store:Ext.create('MyWorkFlowApp.store.MyJsonStore')

                        ,itemTpl:new Ext.XTemplate(
                                                '<div>{[this.getHtml(values)]}</div>',
                                                //                                    '<div>{[this.getBattery(values)]}{priority} - {text}</div>',
                                                {
                                                    // XTemplate configuration:
                                                    //                                        disableFormats:true,
                                                    // member functions:
                                                    getHtml:function (values)
                                                        {
//                                                            debugger;
                                                            var node = values.myrec;
                                                            var value = values.text;

                                                            var leftText = node.data.text;


                                                            var style;
                                                            if (node.data.checked)
                                                                {
                                                                    //                                                        debugger;
                                                                    style = "color: gray;";
                                                                }
                                                            else
                                                                {
                                                                    style = "color: black;";
                                                                }


                                                            return "<span style='" +
                                                                    style +
                                                                    "'>" + leftText + "</span>";
                                                        }
                                                }
                                        )
                    }
                ]
            }
        ],

        listeners:{
            activeitemchange:function (container, newActiveItem, oldActiveItem, eOpts)
                {
                    //newActiveItem.reload();
                    Ext.Msg.alert("add button here");
                }
        }
    }
});
