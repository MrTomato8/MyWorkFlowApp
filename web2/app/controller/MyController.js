Ext.define('MyWorkFlowApp.controller.MyController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs:{
                    mytabpanel:'tabpanel[id=mytabpanel]',
                    list:'list[id=MyJsonList]',
                    list2:'list[id=MyJsonList2]',
                    nestedList:'nestedlist',
                    myContainer:'#mycontainer',
                    itemEditPanel:'itemeditpanel[id=itemeditpanel]'
                },
        control:{
                    'button[itemId="add"]':{
                        tap:'add'
                    },
                    'button[itemId="add2"]':{
                        tap:'add2'
                    },
                    'button[itemId="edit"]':{
                        tap:'edit'
                    },
                    'button[itemId="edit2"]':{
                        tap:'edit2'
                    },
                    'button[itemId="delete"]':{
                        tap:'del'
                    },
                    'button[itemId="markdone"]':{
                        tap:'markdone'
                    },
                    'button[itemId="markdone2"]':{
                        tap:'markdone2'
                    },
                    'button[itemId="load"]':{
                        tap:'load'
                    },
                    'button[itemId="save"]':{
                        tap:'save'
                    },
                    'button[itemId="refreshList"]':{
                        tap:'refreshList'
                    },
                    'button[itemId="refreshList2"]':{
                        tap:'refreshList2'
                    },
                    mytabpanel:{
                        activeitemchange:'activate'
                    },
                    nestedList:{
                        itemtap:'itemtap',
                        itemtaphold:'itemtaphold'
                        ,back:'back'
                    },
                    mynestedlist:{
                        itemtap:'itemtap',
                        itemtaphold:'itemtaphold'
                        ,initialize:'listInit'
                        ,back:'back'
                    },
                    'viewport': {
                                    //capture the orientation change event
                                    orientationchange: 'onOrientationchange'
                                }
                }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    },

    loadException:function(){
    //        debugger;


            var store = Ext.create('Ext.data.Store', {
                            model: "MyWorkFlowApp.model.MyLocalStorageModel"
                        });

                        store.load();

    //                                    debugger;

            var rec = store.getAt(0);
    //        var rec = store.data.items[0];
            var myjsondata = '';

            if (rec && rec.data && rec.data.jsondata) myjsondata = rec.data.jsondata;

    //        myjsondata = rec.get('jsondata');
            myjsondata = eval(myjsondata);

    //                                    debugger;

            var treestore = Ext.getStore('MyJsonTreeStore');

            treestore.setProxy({
                type:'memory',
                data:myjsondata
            });

            treestore.load();

    //                                    treestore.setData(jsondata);

    //                                    var MyJsonTree = Ext.getCmp('MyJsonTree');
    //                                    MyJsonTree.refresh();
        },

        activate:function( tabpanel, tab, oldtab, eOpts )
            {
    //            debugger;
                var result = tab.query('#MyJsonList');
                var list = result[0];

                if (list) this.refreshList();
            },

        itemtap:function (nestedList, list, index, target, record, e, eOpts)
            {
    //            debugger;
                this.currentList = list;
                this.currentRecord = record;

                this.getItemEditPanel().setRecord(this.currentRecord);
            },

        itemtaphold:function (nestedList, list, index, target, record, e, eOpts)
            {
    //            debugger;
                this.currentList = list;
                this.currentRecord = record;

                //Ext.Msg.alert('itemtap HOLD', 'itemtap HOLD');

                var actionSheet = nestedList.up('maintabpanel').query('actionsheet')[0];

                actionSheet.show();

            },

        listInit:function()
            {
                var list = this.getNestedList();
                var items = list.getDockedItems();
                items[0].insert(items.length - 1, {text:'+', id:'add'});
    //            debugger;
            },

        back:function ( nestedList, node, lastActiveList, detailCardActive, eOpts )
            {
    //            this.currentList = list;
    //            debugger;
                this.currentRecord = node.parentNode;

            },

        add:function (nestedList, list, index, target, record, e, eOpts)
            {

                var list = this.getList();
                var nestedList = this.getNestedList();

    //            debugger;
                if (!this.currentRecord)
                    {
                        this.currentRecord = nestedList.getStore().getRoot();
                    }

                var newRecord = this.currentRecord.appendChild({
                    dateCreated:(new Date()).getTime(),
                    checked:false,
                    priority:0,
                    text:"Hellow World!",
                    leaf:false,
                    cls:"folder",
                    children:[]
                });

                this.getPopUp();

                this.popup.show();

                var formpanel = this.popup.query('formpanel')[0];

                formpanel.setRecord(newRecord);

            },

        add2:function (nestedList, list, index, target, record, e, eOpts)
            {

                var list = this.getList();
                var nestedList = this.getNestedList();

    //            debugger;
                this.currentRecord = nestedList.getStore().getRoot().findChild("text", "INBOX");

                var newRecord = this.currentRecord.appendChild({
                    dateCreated:(new Date()).getTime(),
                    checked:false, priority:0,
                    text:"Hellow World!",
                    leaf:false,
                    cls:"folder",
                    children:[]
                });

                this.getPopUp();

                this.popup.show();

                var formpanel = this.popup.query('formpanel')[0];

                formpanel.setRecord(newRecord);

            },

        del:function ()
            {
                var list = this.getList();
                var nestedList = this.getNestedList();

                //debugger;
            },

        markdone:function ()
            {
    //            debugger;
                var list = this.getList();
                var nestedList = this.getNestedList();

                var selectedRecord = list.getSelection()[0];

                if (selectedRecord.data.checked)
                    {
                        selectedRecord.data.checked = false;
                        selectedRecord.original.data.checked = false;
                    }
                else
                    {
                        selectedRecord.data.checked = true;
                        selectedRecord.original.data.checked = true;
                        selectedRecord.original.data.dateFinished = (new Date()).getTime();
                    }

                this.save();
    //            debugger;
                list.refresh();
            },

        markdone2:function ()
            {
    //            debugger;
                var list = this.getList2();
                var nestedList = this.getNestedList();

                var selectedRecord = list.getSelection()[0];

                if (selectedRecord.data.checked)
                    {
                        selectedRecord.data.checked = false;
                        selectedRecord.original.data.checked = false;

                        if (!Ext.isString(selectedRecord.original.data.last30dayTimestamps))
                            {
                                selectedRecord.original.data.last30dayTimestamps = "";
                            }

                        var array = selectedRecord.original.data.last30dayTimestamps.split(",");
                        array.pop();
                        selectedRecord.original.data.last30dayTimestamps = array.join(",");

                    }
                else
                    {
                        selectedRecord.data.checked = true;
                        selectedRecord.original.data.checked = true;

                        if (!Ext.isString(selectedRecord.original.data.last30dayTimestamps))
                            {
                                selectedRecord.original.data.last30dayTimestamps = "";
                            }

                        var array = selectedRecord.original.data.last30dayTimestamps.split(",");
                        array.push((new Date()).getTime());
                        selectedRecord.original.data.last30dayTimestamps = array.join(",");

                    }

                this.save();
    //            debugger;
                list.refresh();
            },

        edit:function ()
            {
                var list = this.getList();
                var nestedList = this.getNestedList();

                this.getPopUp();

                if (!this.currentRecord)
                    {
                        this.currentRecord = nestedList.getStore().getRoot();
                    }

                this.popup.show();

                var formpanel = this.popup.query('formpanel')[0];

                formpanel.setRecord(this.currentRecord);
    //            debugger;
            },

        edit2:function ()
            {
    //            debugger;
                var list = this.getList();

                var selectedRecord = list.getSelection()[0];

                if (selectedRecord)
                    {

                        this.getPopUp();

                        this.popup.show();

                        var formpanel = this.popup.query('formpanel')[0];

                        formpanel.setRecord(selectedRecord.original);

                    }

    //            debugger;
            },

        load:function ()
            {
                var list = this.getList();
                var nestedList = this.getNestedList();

                var oldstore = nestedList.getStore();

    //            debugger;
                var store = Ext.create('MyWorkFlowApp.store.MyJsonTreeStore', {storeId:'' + new Date().getTime()});
                nestedList.setStore(store);

                Ext.data.StoreManager.unregister(oldstore);
                oldstore.destory();
            },

        save:function ()
            {
                var list = this.getList();
                var nestedList = this.getNestedList();

    //            debugger;

    //            var nestedList = this.getTree();

                var rootNode = nestedList.getStore().getRoot();
    //            var rootNode = nestedList.getRootNode();
    //        var rootNode = tree.getRootNode().firstChild;

                var toJSON = rootNode.childrenToJSON();

                console.info(toJSON);

                var url = function(){
                    if (window.location.hostname === "localhost")
                        { return "http://localhost/MyWorkFlowWebApp/php/PetProjects_local.php";}
                    else if (window.location.hostname === "sunnyjacob.co.uk")
                        { return "http://sunnyjacob.co.uk/PetProjects/php/PetProjects.php";}
                }();

                var params = {jsondata:toJSON};

                if (urlParams && Ext.isString(urlParams.username) && urlParams.username.length > 0)
                                {
                                    params.username = urlParams.username;
                                }

                Ext.Ajax.request({
                    url:url,
    //                url:"http://sunnyjacob.co.uk/app/saveTreeData3.php",
    //                url:"http://localhost/MyWorkFlowWebApp/web/php/saveTreeData2.php",
                    params:params
                });

                var store = Ext.create('Ext.data.Store', {
                    model: "MyWorkFlowApp.model.MyLocalStorageModel"
                });

                store.load();
                //debugger;

                var localdata = Ext.create('MyWorkFlowApp.model.MyLocalStorageModel', {jsondata:toJSON});

    //            localdata.save();
                store.add(localdata);
                store.sync();

    //            this.refreshList();

            },

        getPopUp:function ()
            {
                if (!this.popup)
                    {
                        this.popup = Ext.Viewport.add(Ext.create('Ext.Panel', {
                            centered:true,
                            modal:true,
                            showAnimation:{
                                type:'fadeIn',
                                duration:250
                            },
                            hideAnimation:{
                                type:'fadeOut',
                                duration:250
                            },
                            width:"90%",
                            height:500,
                            //                styleHtmlContent:true,
                            //                html:'Hello! I\'m a PopUp',
                            layout:'fit',
                            items:[
                                {
                                    xtype:'titlebar',
                                    docked:'top',
                                    title:'PopUp',
                                    items:[
                                        {
                                            text:'Close',
                                            align:'right',
                                            handler:function (me)
                                                {
                                                    me.up('panel').hide();
                                                }
                                        }
                                    ]
                                },
                                {
                                    xtype:'formpanel',
                                    items:[
                                        {
                                            xtype:'spinnerfield',
                                            name:'priority',
                                            label:'Priority',
                                            minValue:0,
                                            maxValue:100,
                                            increment:1,
                                            cycle:true
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'text',
                                            label:'Text'
                                        },
                                        {
                                            xtype:'checkboxfield',
                                            name:'checked',
                                            label:'Done'
                                        },

                                        {
                                            xtype:'selectfield',
                                            label:'Frequency',
                                            name:'freq',
                                            options:[
                                                {text:'Daily', value:'daily'},
                                                {text:'Weekly', value:'weekly'},
                                                {text:'Once', value:'once'}
                                            ]
                                        },
                                        {
                                            height:100,
                                            items:[
                                                {
                                                    xtype:'button',
                                                    centered:true,
                                                    text:'Save',
                                                    scope:this,
                                                    handler:function (btn)
                                                        {
                                                            var formpanel = btn.up('formpanel');

                                                            formpanel.updateRecord(formpanel.getRecord());

                                                            this.popup.hide();

                                                            this.save();

                                                            this.refreshList();
                                                        }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }));
                    }
                return this.popup;
            },

        refreshList:function ()
            {
    //            var myJsonTreeStore = Ext.getStore('MyJsonTreeStore');

                var nestedList = this.getNestedList();

                var rootNode = nestedList.getStore().getRoot();

                var all = [];

                rootNode.cascadeBy(function (node)
                {
                    node.data.calc_priority = 0;

                    node.bubble(function (n)
                    {
                        node.data.calc_priority += n.data.priority;

                        if (node !== n && n.data.priority > 0)
                            {
                                n.dont_include_me = true;
                            }
                    });

                }, this);

                rootNode.cascadeBy(function (node)
                {

                    if (node.data.priority > 0 && !node.data.checked && node.data.freq !== "daily")
                        {
                            if (!Ext.isBoolean(node.dont_include_me) || !node.dont_include_me)
                                {
                                    var node_copy = node.copy();

                                    node_copy.original = node;

                                    all.push(node_copy);
                                }
                        }

                }, this);

                var gridstore = Ext.getStore('MyJsonStore');

                gridstore.removeAll();
                gridstore.add(all);
                gridstore.sort();
            },

        refreshList2:function ()
            {
    //            var myJsonTreeStore = Ext.getStore('MyJsonTreeStore');

                var nestedList = this.getNestedList();

                var rootNode = nestedList.getStore().getRoot();

                var all = [];

                function isLeaf(node)
                    {
                        var nodeIsLeaf = true;
                        if (node.childNodes.length === 0) return true;
                        else {
                            node.cascadeBy(function(n)
                            {
                                if (!n.data.checked)
                                    {
                                        nodeIsLeaf = false;
                                    }
                            });
                            return nodeIsLeaf;
                        }
                    }

                rootNode.cascadeBy(function (node)
                {

                    if (node.data.freq === "daily" && isLeaf(node) && node.data.checked)
                        {
                            var last30dayTimestamps = node.data.last30dayTimestamps.split(",");

                            var lastTimestamp = last30dayTimestamps.pop();

                            if (Ext.isNumeric(lastTimestamp))
                                {
                                    var date = new Date(lastTimestamp*1);

                                    var now = new Date();
    //                                var dayStart = (new Date()).setHours(0, 0, 0, 0);
                                    var dayStart = Ext.Date.clearTime(new Date());

                                    var isToday = Ext.Date.between(date, dayStart, now);

                                    if (!isToday)
                                        {
                                            node.data.checked = false;
                                        }


    //                                var date = Ext.Date.parse(lastTimestamp, "time");
    //                                alert(Ext.Date.format(date, 'j/d/Y'));
                                }
                            else
                                {
                                    node.data.checked = false;
                                }
                        }

                }, this);

                rootNode.cascadeBy(function (node)
                {

                    if (node.data.freq === "daily" && isLeaf(node) && !node.data.checked)
                        {
                            var node_copy = node.copy();

                            node_copy.original = node;

                            all.push(node_copy);
                        }

                }, this);

                var gridstore = Ext.getStore('MyJsonStore2');

                gridstore.removeAll();
                gridstore.add(all);
                gridstore.sort();
            },

        onOrientationchange: function(viewport, orientation, width, height) {
                console.log('Viewport orientation just changed');


                //another way to check the orientation is by checking the
                //height and width of the screen window
                //There are some issues with the orientation when the code
                //was run on an Android Tablet so you check the height and
                //width for a temporary fix until sencha provides one.
                console.log(height);
                console.log(width);
                if(width > height){
                    orientation = 'landscape';
                }
                else {
                    orientation = 'portrait';
                }
                console.log('Orientation is ' + orientation);

                //remove all the items from the main panel
    //            this.getMyContainer().removeAll(false,false);

                //add the landscape panel based on orientation
                if(orientation == 'landscape'){
                    this.getMyContainer().add(this.getItemEditPanel());
    //                console.log(landscapePanel.getItems());
    //                landscapePanel.add([screenLayout1,screenLayout2]);
    //                this.getMyContainer().add([landscapePanel]);
                }

                //add the portrait panel based on orientation
                if(orientation == 'portrait'){
                    this.getMyContainer().remove(this.getItemEditPanel(), false,false);
    //                console.log(portraitPanel.getItems());
    //                portraitPanel.add([screenLayout1,screenLayout2]);
    //                this.getMyContainer().add([portraitPanel]);
                }
            }
});
