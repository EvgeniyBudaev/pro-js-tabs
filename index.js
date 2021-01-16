class Tabs {
    constructor() {
        this.tabsAll = document.querySelectorAll('[data-tabs="tabs"]')
        this.tabsTriggersAll = null
        this.tabContentAll = null
        this.currentElement = null
        this.idTriggerTab = null
        this.setup()
    }

    setup() {
        if (this.tabsAll) {
            this.tabsAll.forEach(_tabs => {
                const tabsTriggersAll = _tabs.querySelectorAll('[data-tabs="triggers"]')
                const tabContentAll = _tabs.querySelectorAll('[data-tabs="content"]')
                if (tabsTriggersAll) this.generateId(tabsTriggersAll)
                this.tabsTriggersAll = tabsTriggersAll
                this.tabContentAll = tabContentAll
                _tabs.addEventListener('click', (ev) => {
                    const {tabs} = ev.target.dataset
                    if (tabs === 'triggers') {
                        ev.preventDefault()
                        const id = ev.target.dataset.id
                        const idTriggerTab = ev.target.getAttribute('href').replace('#', '')
                        this.idTriggerTab = idTriggerTab
                        this.selectById(id,_tabs)
                        this.tabContentAll.forEach((child) => {
                                                   child.classList.remove('tabs-content__item')
                        })
                                                  
                        this.toggle(ev.target, _tabs)
                    }
                })
            })
        }
    }    

    generateId(elements) {
        elements.forEach((el) => {
            const id = Math.random().toString(36).substring(7) // generate uniq id for triggers
            el.dataset.id = id
        })
    }

    selectById(id,tabs) {
        const currentElement = tabs.querySelector(`[data-id="${id}"]`)
        this.currentElement = currentElement
    }

    isOpen(el) {
        return el.classList.contains('active')
    }

    toggle(el, tabs) {
        tabs.querySelectorAll(".tabs__tab-content").forEach(el => {
                                                                
            el.classList.remove('tabs-content__item')
            el.classList.remove('active')
            el.style.display = "none" // поменяй если нужно
        })
        
        tabs.querySelectorAll('.tabs-content__item.active').forEach(tab => {
            
            this.isOpen(tab) ? this.close(tab,tabs) : this.open(tab, tabs)
            
        })
        
        tabs.querySelectorAll('.tabs-triggers__item.active').forEach(tab => {
            
            this.isOpen(tab) ? this.close(tab,tabs) : this.open(tab, tabs)
        })
        this.isOpen(el) ? this.close(el,tabs) : this.open(el, tabs)
        
    }

    open(el,tabs) {
        el.classList.add('active')
        const _el = tabs.querySelector("#"+this.idTriggerTab)
        _el.classList.remove('tabs-content__item')
        _el.classList.remove('active')
        _el.style.display = "block" // поменяй если нужно
    }

    close(el,tabs) {
        el.classList.remove('active')
    }
                                                          
}

new Tabs()

