const scriptPath = `${App.configDir}/scripts/cpuTable.sh`



const cpuMenu = Widget.Box({
    vertical: true
})

Utils.interval(10000, () => {
    Utils.execAsync(`bash ${scriptPath}`)
            .then((val) => {
                const data = JSON.parse(val);
                let children = []
                data.forEach(element => {
                    const name = Widget.Label({
                        label: element["process"]
                    })
                    const percent = Widget.Label({
                        label: `${element["%"]}%`
                    })

                    children.push(
                        Widget.CenterBox({
                            startWidget: name,
                            endWidget: percent
                        })
                    )
                    cpuMenu.children = children
                });
            })
            .catch(print);
})

export default cpuMenu