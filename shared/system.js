// system.js

let topScopeSystem = window;
try {
    if (window.top && window.top.document) {
        topScopeSystem = window.top;
    }
} catch (e) {
    // Cross-origin blocked
}

if (!topScopeSystem.SystemAPI) {
    const bootTime = Date.now();
    let visitorCount = "Unavailable";
    
    // Fetch visitor count and store it globally
    fetch("https://api.counterapi.dev/v1/sparshkhanna/retroresume")
        .then(r => r.json())
        .then(data => {
            if (data && data.count) {
                visitorCount = data.count;
            } else {
                visitorCount = "Error";
            }
        })
        .catch(() => {
            visitorCount = "Error";
        });

    topScopeSystem.SystemAPI = {
        getBootTime: function() {
            return bootTime;
        },
        getUptime: function() {
            return Math.floor((Date.now() - bootTime) / 1000);
        },
        getVisitorCount: function() {
            return visitorCount;
        },
        getVersion: function() {
            return "1.0.0";
        },
        volume: 0.5,
        setVolume: function(level) {
            this.volume = Math.max(0, Math.min(1, level));
        },
        getVolume: function() {
            return this.volume;
        },

        playSound: function(type) {
            try {
                const sounds = {
                    click: 'data:audio/wav;base64,UklGRrQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZABAAB/yff3yoI5CgYucrvt+NiZUhoFGlCW0/Ttw4NCFAokWpzT8evEiUsdDB1Khr/m7teobTgXEipZkcTk6tSockAeFCVLfrDW59/BlGI3HRksUH6s0OLex6F0SSodIjpgirLQ3trFo3tUNSMiMU1xl7nQ2tTBo4BdPywmLUBcfZ66zdXQwaiKa086LSs0Rl97mLDDzc/GtqCGbFRBNTE0QFFnfparu8XJxrytm4ZwXUxAOTg8RVNkdombqra+wsG7sqaXh3dnWU5FQD9BRk9ZZXOAjpqlrrS4uri1r6ielIp/dGphWVJNSklJS05TWV9nbnZ+ho6Vm6Clqautrq6tq6mlop6ZlJCLhoF8d3Nva2dkYl9dXFpZWVhYWFlZWltcXl9gYmRlZ2hqa21ucHFydHV2d3h5enp7fHx9fX5+fn5+fn9+fn5+fn59fX18fHt7enp5eXh4d3d2dnV0dHNzc3JycnFxcXFxcXJycnNzdHR1dnd4eHl6e3x9fn+AgIGBgoKCg4OCgoKCgYGAgIB/f39/',
                    open: 'data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAAB/nLjR5fP7/PXo1byggmRHLhkLBAQLGi5IZYSivtbp9Pj16de/o4RlSC4aDAcJFCU9WnmYts/j8PXx5dG4mntbPycVDAsTIzpWdZW0zuHu8evdx6uMbE0yHhEOFCI5VXSVs83h6+3l1LuefV1AKBgRFCE2UnGSsczf6enfzLKTclI3IhcVHjBKaYqqxdrl5t3Kr49uTjQhGBomPFh5mrjQ3+TezbSVdFQ4JRsdKT9cfZ680t/g18OnhmVHLyEeJjlUdZa0zNve1cKmhmVHMCMhLEBdfp+80NvZy7SVdFQ6KSMqPFd3mLbM19fKs5RzUzoqJi5CXn+gvM7W0cClhWRHMiksO1V0lbPI09DCqYloSzYrLj1Xdpe0yNHMu6GBYUUzLTVIZISkvczOwqyOblA6MDNDXX2dt8jMwq2QcFI9MzZGYICfuMfJvaaIaE06NTxQbYypvsfCsZZ3WUM4OkpjgqC4xMO0m31fRzo7SWKAnrXCwLKZe11HPD9OaIajuMG8qo9xVkM9RVl1k6y8vrKbf2JLQENSbImktry0oYVoUUNDUWmGobS6s6CFaVJFRlRsiKKzuK+bgGVQRkpbdJCntLWokXVcTEhSZoGbrrStm4FnU0pOX3iSp7KvoIhuWE1OXHSNo6+uoYpwW09QXXSNoq6snohvWlBSYXiQo6yomYJqWFFXaH+WpqujkHljVlRfc4qeqKaZhG1cVVpqgJakp56LdWJYWWZ6kKCln496ZlpaZXiMnaSfkHtoXFtleIycop2OemhdXWh6jZygmop3Z15gbX+QnJ6VhXJkX2VzhZScmo59bWNia3uMmJuUhXVoY2h0hZOZlot7bWVmcH+Ol5eOgHFoZ258ipSWj4J0amhueoiSlI+Ddmxpb3qHkJONgnZta3B7h4+RjIF2bm1zfYiPj4l/dG9vdoCJjo2GfHNvcnmDio2JgnlycXV9hYuLhn52c3R6gYeKh4F6dXR4foSIh4N9eHV3fIKGh4R/end4e4CEhYSAfHl5e3+ChIOAfXp6fH6BgoKAfXx7fH6AgYF/fn19fX5/gH9/fn5+fg==',
                    close: 'data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAAB/uOX799inbTcQAQ0xZZ7R8vrpwo1VJgkFGUJ3rtv09uC2gkwhCQgeSHyw2vP037eEUSYNCRxBcqXR7fTlw5ViNRYKFDFcjbzf8e7XsIFRKhINHD1pmMPi7+nRqnxPKhQPHj1nlL7d7OnUsodaNBsRGTJXgqzP5erfxJ50SysYFCI9Y4yz0+Xn2r+ackstGhcjPF+GrMzg5dzGpX9ZOSIZHjBOcpe50+Hh1LybdlM2IhsiNFFzl7fQ3t/UvqB+XD8pHyEuRmSGpsLV3drLtJV1VTspISUzSWaGpb/R2tjMt5x9X0UxJiUuQFh1k67E0tjTxbCWeV1FMykoMEBWcYynvczU08m4oohtVEAxKyw1Rlx1j6e7ydHQyLmljXVdSDkwLjM/UGZ+lau8yM7MxLakjndhTj40MTM8S11yiJ2vvsfLyMCyoY15ZFJDOTU1PEdWaHyQorK+xcfEvK+gjntoWEo/OTg8RFBfcIKTo7G7wcPBuq+ikoFxYVNIQDw9QUlUYXCAkJ+rtby/vrqzqJyNf3BiVkxFQUBDSVFcaXeFkp+psre6urexqZ+Th3ptYVdPSUVFRktSWmVwfIiTnaaus7a2tLCqopmOhHluZFtUT0tJSkxRV15ncXqEjpefpquvsbGvrKehmpKJgHduZl9ZVVFPT1BSVlthaHB3f4ePlpyhpqmrq6uppqKdmJGLhH12b2lkX1tYVlVVVlhaXmJnbXJ4foSKj5SZnaCipKWlpKOhnpqXko6JhH96dXBsaGViYF5cXFxcXV9hY2ZqbXF1eX2BhYiMj5KVl5mbnJ2dnZ2cm5mXlZOQjouIhYJ/fHl2dHFvbWtpaGdmZWVlZWVmZmdpamttb3FydHZ5e31/gYOEhoiJi4yNj4+QkZKSkpOTk5KSkpGRkI+Pjo2Mi4qJiIeGhYOCgYB/fn18e3t6eXh3d3Z2dXV0dHRzc3Nzc3JycnJyc3Nzc3Nzc3R0dHR1dXV2dnZ2d3d3eHh4eXl5eXp6enp7e3t7fHx8fHx9fX19fX19fX5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fg==',
                    error: 'data:audio/wav;base64,UklGRqQMAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYAMAAB/jZyquMXR3OXt8/j7/f369/Hq4tjNwLOll4h6a1xOQTUpHxYPCQQCAQIFCQ8WHyo1QU9da3qIl6WzwMzX4Onw9fn6+/n28evj2s/Dt6mbjX9wYlRGOi4kGxMMCAUDBAYJDxYeKDI+S1lndYOSoK26x9Lc5Ozx9fj5+PXx6+Tb0ca6raCSg3VnWUw/MykfFxALCAYFBwoPFR0mMDtIVWJwfo2bqLXBzdfg5+7y9ff29PHr5d3Tyb2xo5aIemxeUUQ4LSQbFA8LCAcICw8VHCQuOURRXmx6iJajsLzI0tvj6u/y9PTz8Ovl3tXLwLSnmox/cWNWST0yKCAYEg4LCgoMDxQbIyw2Qk5aaHWDkZ6rt8PN19/m6+/y8vLv6+bf1s3Ct6uekYN1aFtOQjctJBwWEQ4MDA0QFRoiKjQ/S1dkcX6MmaayvsnS2+Lo7O/w8O7r5t/Yz8W6rqKVh3ptYFNHPDIpIRoVEQ8ODxEVGiEpMjxIVGBteoeUoa25xM7W3uTp7O7u7erm4NnQx7yxpZiMfnFlWExBNi0lHhgUERAQEhUaICgwOkVQXGl2g5CcqbS/ydLa4OXp6+zr6eXg2dLJv7SonJCDdmldUUY7MikiHBcUEhITFhogJy84Qk1ZZXJ+i5ikr7rEztbc4ubp6uro5eDa08rBtqugk4d6bmJWSkA2LSYgGxcVFBUXGyAmLjZAS1ZibnqHk5+rtsDJ0dje4+bo6Obk4NrUzMO5rqOXi35yZlpPRDsyKiMeGhcWFxgbICYtNT5IU15qdoOPm6axu8XN1Nvf4+Xm5ePf2tTNxLuxppqPg3ZqX1RJPzYuJyIdGhkYGhwgJiw0PEZQW2dzfoqWoq23wMnQ19zg4uTj4t/a1c7GvbOpnpKGe29jWE1EOjIrJSEdGxobHSEmLDM7RE5YY297hpKdqLK8xczT2N3g4eHg3trVzse/tauhlYp/c2hcUkg/Ni8pJCAeHR0fISYrMjlCTFZga3eCjpmkrrjAyM/V2d3f39/d2dXPyMC3rqOZjoJ3bGFWTEM7My0nIyAfHyAiJisxOEBJU11oc3+KlZ+qs7zEy9HW2tzd3dvY1M/JwbmwppyRhntwZVtRRz83MCsnIyEhIiQnKzE3P0hRW2Vwe4aRm6WvuMDHztPX2dvb2tjUz8nCurKonpSJf3RpX1VLQzs0LiomJCMjJSgrMTc+Rk9YYm13go2Xoau0vMPKz9TX2NnY1tPPysO8tKuhl42Cd21jWVBHPzgyLSknJSUmKSwxNj1FTVZganR+iZOdp7C4wMbM0NTW19fV0s/KxL21rKOakIV7cWddVEtDPDYxLCooJygqLTE2PENLVF1ncXuFj5mjrLS8wsjN0dPV1dTRzsrEvraupZyTiX90a2FYT0dAOTQwLCopKisuMTY8QkpSW2RueIKMlZ+osLi/xcrO0NLT0tDNycS+t7Cnn5WMgnhuZVxTS0Q9ODMvLSwrLC8yNjtCSVFZYmt1f4iSm6SstLvBxsrO0NDQz8zJxL+4samhmI6Fe3JoX1dPR0E7NjIwLi4uMDM3O0FIT1dgaXJ7hY6XoKiwt73Dx8vNzs7Ny8jEv7myq6OakYh/dWxjW1NLRD86NjMxMDAxNDc7QUdOVV5mb3iCi5Scpayzur/EyMrMzMzKx8S/ubOspJyTi4J4b2deVk9IQj05NTMyMjM1ODxBRk1UXGRtdn6HkJmhqbC2vMHFx8nKysnGw7+6tK2mnpaNhHxzamJaUkxGQDw4NjQ0NDY5PEFGTFNaYmpzfISNlZ2lrLO4vcHFx8jIx8XCv7q0rqegmJCHf3ZtZV1WT0lEPzs5NzY2Nzo9QUZLUllgaHB5gYqSmqKpr7W6vsLExcbFxMG+urWvqKGakoqBeXFpYVpTTUdCPjs5ODg5Oz5BRktRWF9mbnZ+h4+XnqWssre7v8HDxMTCwL25ta+po5uUjIR8dGxkXVZQSkZCPjw7Ojs8P0JGS1BXXWVsdHyEjJOboqius7i8v8DCwsG/vLm1sKqknZaOhn93b2dgWlNOSUVBPz08PT5AQ0ZLUFZcY2pyeYGJkJiepauwtbm8vr/Av767uLSwqqWel5CJgXlya2RdV1FMSERCQD8/P0FDR0tQVVtiaHB3f4aNlJuiqK2ytrm7vb29vLq4tLCrpZ+ZkouDfHVuZ2BaVE9LR0RCQUFBQkVHS1BVWmBnbnV8g4qRmJ6kqq6ztri6u7u7ubezsKumoJqTjYZ/d3BqY11XUk5KR0VDQ0NERkhMUFRaX2Zsc3qBiI+Vm6Gnq7Cztri5ubm4tbOvq6ahm5WOiIF6c21mYFtWUU1KSEZFRUZHSUxQVFlfZGtxeH6FjJKYnqOorLCztba3t7a0sq+rpqGclpCJg3x2b2ljXllUUE1KSEdHR0lKTVBUWV5kaXB2fIOJj5WboKWprbCytLW1tLOxrqqmop2XkYuFf3hybGZhXFdTUE1LSklJSkxOUVVZXmNobnR6gYeNk5idoqeqrbCys7OysbCtqqainZiSjYeBenRvaWRfWlZTUE5MS0tMTU9SVVldYmdtc3l+hIqQlZufpKerra+wsbGwrqyppqKdmZOOiIJ9d3FsZmFdWVVTUE9OTU5PUFNWWV1iZ2xxd32CiI6TmJ2hpKiqrK6vr66tq6ilop6ZlI+KhH95c25pZGBcWFVTUVBPUFBSVFdaXWJma3B1e4CGi5CVmp6ipaiqq6ytrKuqp6WhnpmVkIuGgHt2cGxnYl9bWFZUUlJSUlNVV1peYWZqb3R5foSJjpOXm5+ipaepqqqqqqimpKGdmpWRjIeCfXhzbmllYV5bWFZVVFRUVVZYW15iZWpuc3h9goeMkJWZnKCipaaoqKiop6WjoJ2ZlpGNiIN+enVwbGhkYF1bWVdWVlZXWFpcX2JlaW5yd3uAhYmOkpaanaCipKWmpqalpKKfnJmWko6JhYB7d3JuamZjYF1bWllYWFhZW11fYmZpbXF2en+Dh4yQlJeanZ+ho6SkpKOioJ6cmZaSjoqGgX15dHBsaWZjYF5cW1paWltcXmBjZmltcXV5fYGGio6RlZibnZ+goaKioaGfnZuYlZKOi4eDf3p2cm9raGVjYF9dXFxcXV5fYWRmaW1wdHh8gISIi4+SlZianJ6foKCgn56cmpiVko+Lh4SAfHh0cW1qZ2VjYWBfXl5fYGFiZWdqbXBzd3t+goaJjZCTlpiam52dnp6dnJuZl5SSj4uIhYF9enZzcG1qZ2VjYmFhYGFhYmRmaGptcHN2en2BhIiLjpGTlpeZmpucnJuamZiWlJGOjIiFgn97eHVyb2xqaGZkY2NiY2NkZWdpa21wc3Z5fICDhomMj5GTlZeYmZmZmZmYlpWTkY6MiYaDgHx5dnNxbmxqaGdmZWVlZWZnaGpsbnBzdnl8foGEh4qNj5GTlJaXl5eXl5aVlJKQjouJhoOAfnt4dXNwbmxraWhnZ2dnZ2hpa21vcXN2eHt+gIOGiIuNj5GSk5SVlZWVlJOSkY+Ni4mGhIF+fHl3dHJwbm1ramppaWlpamtsbm9xc3Z4en1/goSHiYuNjpCRkpOTk5OSkpGPjoyKiIaEgn99e3h2dHJwb25tbGtra2tsbW5vcHJ0dnh6fH6Bg4WHiYuMjo+QkJGRkZGQj46Ni4qIhoSCgH58enh2dHJxcG9ubW1tbW5ub3Bxc3R2eHp8foCChIaHiYqMjY6Oj4+Pj46OjYyKiYeGhIKAf317eXd2dHNycXBwb29vcHBxcnN0dXd4enx9f4GChIaHiIqLi4yMjY2NjIyLiomIh4WEgoF/fXx6eXd2dXRzcnJxcXFxcnJzdHV2d3l6fH1+gIGDhIWHiImJioqLi4uKiomJiIeGhYOCgX9+fXt6eXh3dnV0dHRzc3R0dHV1dnd4eXp8fX5/gYKDhIWGh4eIiIiJiYiIiIeGhoWEg4KBgH99fHt6eXh4d3d2dnZ1dnZ2dnd4eHl6e3x9fn+AgYKDg4SFhYaGhoaGhoaGhYWEhIOCgYGAf359fHt7enl5eHh4eHh4eHh4eXl6ent8fH1+fn+AgYGCgoODhISEhISEhISEg4OCgoGBgIB/fn59fXx8e3t6enp6enp6enp6e3t7fHx9fX5+f3+AgIGBgYKCgoKCgoKCgoKCgYGBgICAf39/fn59fX19fHx8fHx8fHx8fHx8fX19fX5+fn5/f39/f4CAgICAgICAgICAgICAgH9/f39/f39+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fg==',
                    startup: 'data:audio/wav;base64,UklGRgQvAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YeAuAAB/iJKbpKyyt7u9vr27t7Kro5uRiH1zamBYUEpFQT8/QEJHTFNcZW54g42XoKivtbq9v769ubSupp6UioB1a2JZUUpFQT4+P0JGTFNcZW96hI+Zoqqyt7y+v7+8uLKro5qQhXpwZlxTTEZBPj0+QERKUVpjbXiDjpiiqrK4vL/Av724squimI6DeG1jWVFJREA9PT5BRk1VXmhzfomUnqevtru/wMC+urStpJqQhXluZFpRSUM/PTw+QUZNVV9pdICLlqCqsri9wMHAvbiyqqCWi390aV5UTEVAPTw8P0RKUlxmcn2JlJ+psbi9wcLBvrmyqqCWin5zZ1xTSkQ/PDs8QEVMVV9qdoKOmaSttbvAwsLAvLaupZqPg3drX1VMRT88Ojs+Q0pTXWh0gY2ZpK21vMDDw8C8tq6kmY2BdGhdUkpDPjs6PD9FTVdhbXqGk56psrq/wsPCv7mxqJ2RhHhrX1VLRD46OTs+RExVYGx5hpKeqbO6wMPEwr+4sKabj4J1aFxSSUE8OTk7P0ZPWWVxf4yYpK63vsLExMG8tKuglId5bGBUS0M9OTg6PkRNV2NwfYqXpK63vsPFxMG8tKqfkoV4al5SSUE7ODg6P0ZPWmd0go+cqLK7wcXFxMC5sKWZi35wY1ZMQz05Nzk9Q0xXY3F/jJqmsbrBxcbFwbqxppqMfnBiVktCPDg3OD1ETVhlc4GPnam0vMLGxsS/uK6ilYd5al1RRz85Njc6QEhTX2x7iZelsLrBxcfGwbuxppmKfG1fU0g/OTY2OT5HUV5reomXpbC6wcbIxsK6sKWXiXprXVBGPjg1NjlASVRhcH+OnKm1vsTHyMW/t6yfkIFyY1ZKQTo2NTc9RVBca3qJmKayvMPHyMbBua6hk4R0ZVdLQTo1NDc8RE9ca3qKmaezvcTIycbBuK2fkIFxYlRIPzg0NDc+R1NhcICPnqy4wcfJycW9s6eYiXlpWk1COjUzNTpDTltqeoqaqLW/xsnKxsC2qpuMe2tcTkM6NTM0OUJNWmp6ipqptb/GysrGv7Womop5aVpMQTk0MjU7RFBebn6Pn625wsjLycS8saOTg3JiU0Y8NTIzNz9KV2d3iJmotcDHy8vHwLWomIh3ZlZJPjYyMjU9R1RkdYaXprS/x8vLyMC2qJmIdmVWSD01MjI1PUhWZneImam3wcjMy8e/s6WVg3JhUUQ6MzEyN0BNW2x+j6CvvMXLzcrEuq2djHpoWEk+NTExNDxHVWZ3ipurucPKzczGvbChkH5sW0w/NjEwMzpFU2R2iJqquMPKzczHvbGhkH1rWko+NTAwMztHVWZ4i52tu8XMzszFu62di3hmVUY6My8wNT9LW22AkqS0wMnOzsrBtaaUgW5cTD81MC8yOkZUZnmMnq+8x83PzMS5qpmGc2FQQTcwLjE4Q1JjdomcrbvGzc/Nxrqsmod0YVBBNjAuMDhDUmR3i52vvcjOz8zFuamXhHBdTD40Li0xOkZWaX2Qo7TBys/PysG0o5B8aFZGOTEtLjQ/TV9yh5qsu8fO0M7GuqqYhHBcSz0zLS0xO0hZbIGVqLjFzdHPyb2unIh0YE4/NC0sMDlGV2p+k6a3xM3R0Mm+r52IdF9NPjMtLDA5R1hsgZWpucbO0s/IvKyZhG9bSTsxLCwyPEtdcYebrr7K0NLOxbemknxnVEM2ListNUJTZnuRpbfFztLRyr6um4ZwXEk6MCsrMT1MX3SKn7LBzNLSzcKzoIt2YE09MisqLzpJW3CGnK+/y9LTzsS1oo13Yk4+MisqLzlIW3CHnLDAzNLTzsO0oYt1X0w8MCoqMDtLXnSLoLTDztPTzMCwnIVvWUY3LSkrMj9RZXyTqLrI0dTRyLqoknxlUD8yKiktOEdbcYiessPO1NTNwbCchW5YRTYsKCszQVNpgJesvszT1dDFtaGLdF1JOS0oKTE+UGV8k6m8ytPV0ce4pI12X0o5LigpMD1PZHyTqbzL09bRx7ejjHRdSDgtJykxPlFnf5etv83V1tDFtJ+Hb1hENConKjNDV22GnbPE0NbVzcCtl39nUD0wKCctOUpgeJCnu8vU19PIuKOLcltGNSomKTJBVm2GnrTF0dfVzb+rlHtjTDotJicuPE9mfpeuwc/W19DDsJqBaFE9LycmLDlLYnuUq7/O1tfSxbOcg2pSPi8nJSs4SmF6lKu/ztfY0sWym4JoUT0uJiUsOUxjfZeuwtDY2NDCr5d9ZEw5LCUmLj1RaYOdtMbT2dfNvaiPdVxFNCgkJzJDWXONprzN19nUyLWehGpRPC0lJCs5TWWAmrLF09nYz7+pkHVbRTMnIyczRVx2kKq/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hLrY0alwPCQwXJbH2ceYXjEkPG+o0de6hEwpKEuDudfRqXA9JDFdl8fZxpZcMCU+cqvS1reASSgqT4i82M6kajkkNWSey9jBjlUtJ0V7stTTr3dCJi9ZksTYyJlfMiU9cKnQ1reASSgrUYm918yhZzclOGiizde8iE8rKUuDuNbPpm07JjVjncrXv4xULShIf7XV0KlxPiY0YZrI18GOVi4oR3201NCqcT4mNGCayNfAjlUuKUh+tNTPqXA9JzVjnMnWvotTLSpLgbfVzaVsOyc4Z6DL1bqGTissUIe71cqfZjcnPG6nztO0fkgpL1eQwdbFll0yKEN4r9HQrHRBKDRhmsfVvotTLitNhLjUy6FoOSg8bqbO07N9SCoxWZLC1cKSWjEqSH2z0s2mbTwoOmmiy9O2gUsrMFePwNXElFwyKkd8stLNpm49KTpqosvTtYBKKzFZkcHUwZFZMStKgLXSy6FpOik+b6fN0bB5RSo1YJjG07yJUi4uUom808WYXzQrRnqx0cylbT0qPGykzNGxe0crNF+XxdO7iVIuL1OKvNPEll00LEl+s9HKoWk6KkByqc3OrHVCKzlmn8nRtYBKLDNclMPSvIpTMC9TirzSw5RcNC1LgLXRyJ1lOCtEd63PzKZuPis+bqbMzq12RCw5Zp7I0LN+SS01X5fE0bmGTy8yWZDA0b2MVTEwU4q80cGSWzMuToS30cSYYDYtSn6z0MedZTktRnqvzsmhaTssQ3WszcqlbT4sQXGozMyocUAtP26ly8yqdEItPWujyc2sdkQtPGmhyM6ueEYtO2ifx86vekcuOmeex86we0guOmadxs6we0guOmadxs6we0guOmadxs2we0guO2eex82vekcuO2ifx82teEYuPWqhyMyrdkQuPmyjycupc0MuQG+mysqmcEEuQnOpy8mjbT4vRXaszMegaTwvSHuvzcWbZDowTICzzcKWXzcxUIW3zr+RWjUzVYu7zruLVTM1W5G/zbaEUDE4YZjCzLF9SjA8aJ/Gy6t2RTBBb6XJyKRuQDBGeKzLxZxmOzFNgLPMwJRdNzNUirrNuopVNDddk7/Ms4FNMTtmncTKq3ZFMUJwpsjHoms/MUl8r8vBl2E5M1KHuMy7jFY1N12Tv8uyf0wyPWifxcmoc0MxRXWqycScZjwzT4O0y72PWjY3WpC9y7OBTjM9aJ7EyKhzRDJGdqvJw5pkOzRRhbbLuotWNTlflb/Kr3xKMkFuo8bFoWs/M0x/scq9kVw4N1qPvMqygE4zP2qgxcakb0IzSnyvyb6TXjk3WY67yrOBTjQ/aqDExqNuQTNLfa/JvZFcODhbkLzJsH5MNEFuo8XEn2o/NU+Cs8m5jFc3O2GXwMiqd0c0R3apx8CXYjs3V4u5ybOCTzVAa6DExKFsQDVPgrLJuYtXNzxjmMDGqHRGNUl5rMe9k146OVyRvMite0s1RXOnxsCYYzw4V4u5yLGATjZCbqPEwpxnPzdUiLbIs4RRNkFsoMPCn2pAN1OFtci0hVM3QGqfwsOfa0E3UoW0x7SFUzdBa5/Cwp9qQTdThrXHs4RSN0JsocPBnGhAOFaJtsexgU83RHCkxL+ZZD45WY25xq18TDdHdajFvJNfPDxfk7zFqHZIN0x8rca4jFk6P2aav8KhbkM4UoSzxrOEUjhEb6LCv5llPztbjrnFq3lLOEp5q8W5jls7P2WZv8KhbkM5VIWzxbGCUThGcqTDvJVhPT1fk7vDpnNHOVCAsMW0hlQ5RG6hwb6YZD88XZC6w6h2STlPfq7EtIdVOkRtoMG9mGQ/PF6RusOmdUg5UICvxLOFVDpFcKPBvJRhPj5hlLvBo3BGOlSFs8Ovf1A6SXaowriOXDxBaJu+vpxpQjxbjrjCqHZKOlCAr8OyhFM7R3KkwbmRXj5BZpm9v51qQzxbjLfCqHdKO1GAr8Kwg1M7SXSmwbiOXD1DaZy+vZlnQT5fkbnAo3FHPFaGs8KrfE47TnyrwrKGVjxIcqPAuJBePkNpm728mWdCP2CSub+hb0Y9WIm0wah4TDxSga7BroFSPEx4qMG0iVg9R3Giv7iQXz9DaZu9u5dlQkFjlLq+nmxFP12Otr+jc0k9V4eywKh5TT1Sga7ArX9RPU57qsCwhFU9S3amv7SKWT5IcaK+to9eP0Zsnb25k2JBRGiZu7qXZkNCZJa6vJtpREFhkri9nm1GQF6Ptr2gcEg/W4y0vqNzSj9ZibO+pXVLP1eGsb6neE0/VoSwv6h6Tj5Ug66/qXtPP1OBrb6qfVA/UoCtvqt9UT9Sf6y+q35RP1J/rL6rflI/Un6rvqt+Uj9Sf6u+q35RP1J/rL6rflE/U4Csvqp9UEBUga29qXtQQFWCrr2oek9AVoSvvaZ4TkBYhrC9pHZMQVqJsbyic0tBXIuzu6BwSUJejrS7nW1IQ2GRtrmaakdEZZS3uJdnRUZomLm2k2NESGycurSPX0NKcKC7sopcQk11o7uvhVhBUHqnvKuAVEFTgKu8p3tQQliFr7ujdU1DXYuyup5vSURikbW4mGlHRmiXt7WSY0VJbp25sotdQ011o7quhFdCUn2ou6h9UkJXhK66onVNQ16MsrmcbUlGZZS2tpRlRkltnLiyjF5ETnajuqyDV0NUf6m6pnpQQ1uIr7mecUtFY5G0tpZnR0lsmreyjF9ETnajuayCVkNVgKq5pHhPRF2LsLebbUpHZ5W1tJFjRkxxn7iuhlpEU32ouaZ6UUVciK+3nG9LR2aUtLORZEdMcZ+4rYVZRVR+qLikeVFFXoqwtppsSklpl7WxjmBGT3aiuKqAVkVYg6u3oHNOR2ORs7STZkhMcJ23rYZaRVV+qLijd1BGYI2xtZdpSUttmrauiFxGU3ymt6R5Ukdfi7C1l2pKS22ata6JXUZUfKa3pHlSR2CMsLSWaUpMbpu1rYdbR1V+qLaidlBIYo+xs5NmSU5ynraqg1hHWYOqtZ1xTkpnlLOwjmFIUnijtqZ8VEheiq60l2tLTW6atKyGW0dXgKi1n3NPSmaSsrCOYklSeKK1pXtUSGCLrrKVaUtOcZy0qYNZSFqEqrSbb05Ma5ezrYleSFZ+prWfdVFKZpKxr45iSVN5o7SjeVNKYo6vsZFmS1F2oLSlfVZJYIqtsZRpTFBznbSngFhJXoisspZrTU9xnLOogVlJXYarspdsTU9wm7OoglpKXIaqspdsTU9wm7OoglpKXYaqsZdsTVBxm7KngVlKXoirsZVqTVFznbKmf1hLYIqssJNoTVJ1n7KkfFZLY42tr5BlTFR5obKheFRMZpGvrYtiS1d9pLKdc1JOa5WwqoZeS1uDqLGYbk9QcJqxpoBZTGCJq6+SaE1Ud5+xoXlVTWaQrqyLYkxYf6Wxm3JRT22XsKeDXExfh6mvk2pOVHaesaF6Vk1mkK2rimJNWYClsJlwUVFwmbClgFpNYYqrrZBnTlZ6obCddVRPa5WvqIVdTV6GqK6Tak9Vd5+wn3hVT2mSrqmHX01dhKeulWxQVHadsKB5Vk9oka2ph2BOXYSnrpRsUFV2na+feVZPaZKtqIZfTl+Fp62SalBWeJ+vnXZVUWyUraaDXU5hiamsj2dPWX2irppyU1NxmK6iflpPZo6rqYliT12Cpa2UbFFWd52unXdWUWyUraWCXU9jiqmqjWVQW3+jrZZvUlV1m66feVdRa5OspYNeUGKJqKqNZlBbf6Otlm9TVnacrZ54V1JtlKykgV1QZYupqIpkUF6CpKuTbFJYeZ6tmnRVVHGYrKB8WlJpkKqlhWBRYoinqY1mUV2Ao6uUbVNYeJ2smnVWVHGXrKB8WlJqkaqkg19RZIqnqIpkUV+DpKqRalNafKCrl3FVV3abq5x3WFRvlaugfVtTapCppIRgUmWKp6eJZFJghKSpj2lTXH6hqpRuVFl5nauYc1ZXdJmrnHhZVW+UqqB9XFRqkKmjgl9TZoynpYdjU2OHpaeLZlNgg6Ooj2pUXX+gqZNuVVt7naqWcVZZd5uqmXVYV3OYqpx5WlZwlamefFxVbZKooH9eVGqPqKKCYFRojKejhWJUZYmlpYhkVGOHpKaKZlRihKOmjGhUYIKip45qVV+AoKeQbFVefp+okm1WXXyeqJNvVlx7naiUcVdbeZyolXJYWnibqJZzWFp3mqiXdFladpmomHVZWXWYqJh1WVl1mKiZdlpZdZeomXZaWXSXp5l3Wll0l6eZd1pZdJenmXdaWXSXp5l2Wlp1l6eYdlpadZinmHVaWnaYp5d1Wlt3maeWdFpbeJmmlXNZXHmappRyWV16m6aTcVlde5ymkm9YXn2dpZBuWGB/nqWPbFhhgJ+kjWtYYoKgpItpV2SFoaOJZ1dmh6Kih2VYaImjoIRkWGqMo5+CYlhsjqSdf2BZb5Glm3xfWnGTpZl5XVt0lqWXdlxceJillHNaXnuapJFvWmB+naOObFljgp+iimlZZoagoYZmWWmKop+CY1lsjaOcfmFacJGkmXpeXHSVpJZ2XF55mKSScVtgfZujjm1aY4KeoYppWWeHoJ+FZlpri6KdgGJbb5CjmXtfXHSUo5V2XV95mKORcVtif5yijGxaZYSfoIZnWmqKoZ2BY1tvj6KZe2BddZSjlHVdYHuZoo9vW2OBnKCKaltoh5+eg2VbbY2hmn1hXXOSopV2XmB6l6KQcFxjgJygiWpbaIefnYNlXG6OoZl8YV51k6GTdV5hfJmhjW5cZoOdnoZoXGuKoJp/Y11ykaGVd19geZehj3BdZYGbn4hqXGqJn5uAZF1xkKCWeGBgeZagj3FdZYGbnodqXWuJn5p/ZF5ykaCUd2Bhe5efjW9dZ4OcnYVoXW2Ln5h9Y191k6CSdF9jfpmeimxdaoedm4FmXnGPn5V4YWJ6lp+NcF5ng5uchWheboyel3tjYXeUn5ByX2aBmp2Hal5tip6YfWRgdZKfkXRgZX+ZnYhrX2yJnZh+ZWB1kZ6RdWBlfpidiGxfbIidmH5lYXWRnpF0YGV/mJyIa19tiZ2XfWVhdpKekHNgZoCZm4ZqYG6LnZZ7ZGJ4k52NcWBog5qag2lgcY2dlHljZHuVnIpvYGuGm5iAZ2F0kJ2QdWJmf5ibhmtgb4qclXtkY3mTnIxxYWqEmpiBaGFzjpyRdmJmfpebh2xhboqblXxlZHmTnIxxYWuFmpiBaGJ0j5yQdWJogJeahWticIubk3lkZXyVm4luYm2HmpV9ZmR4kpuMcmJrhJmXgWhjdY+bj3VjaYGXmIRrYnKMm5F4ZGd+lZmGbWJwipqTemVmfJSaiG9iboiZlHxmZXqSmopwY22GmZV+Z2V4kZqLcmNshZiWf2hkd5CajHNka4SXloBpZHaPmo10ZGuDl5aBamR2j5qNdGRrg5eWgWpldo6ZjXRka4OXloFqZXaOmY10ZGuDl5WAamV3j5mMdGVshJeVgGlmd4+Zi3NlbYWXlH5pZnmQmIpyZW6Gl5N9aGd6kZiIcGVwiJeSe2hofJKXhm9lcomYkHlnaX6TloRtZXSLmI53ZmuBlZWBa2Z2jpiMdGZthJaTfmpneZCXiXFmcIeWkXtoaX2SloVvZnOKl454Z2uAlJSCbGd2jZeLdGduhJWSfmpoepCWh3FmcYiWj3poa3+SlYNuZ3WMlox1Z26DlJJ+a2l6j5aHcWdyiJaPemlrf5KUg25odoyWi3Vnb4SUkX1qanuQlYZwZ3OJlY14aG2Bk5KAbGl5jpWIc2hxh5WPempsf5KTgm5pd4yVinRocIWUkHxra32Qk4RvaXaLlYt2aW+Ek5B9a2t8kJSEcGl1ipSLdmlvg5OQfmxrfI+ThXBpdYqUi3dpb4OTkH1sa3yPk4RwaXaKlIp2anCEk499bGx9j5KDcGp3i5SJdWpxhZOOe2ttfpCRgm9qeIyTiHRqc4aTjXprboCRkIBua3qNkoVyanWIk4t3a3CDkY99bW19j5GDcGt4i5KIdWtzhpKMemxvgJCQf25se42ShXJrdomSiXZrcoSRjXttbn+PkIFvbHqMkYVza3WIkop3bHGDkY18bW5+j5CBcGx6i5GFc2x2iJGJd2xyg5CNfG1vf46PgHBte4yRhXNsdoiRiHdsc4SQjHttcICPjn9vbnyNkINybXiKkId1bXWGkIp5bXKCj4x8bm9/jo6AcW57i5CEc213iJCHdm10hZCKem5ygo+MfW9wfo2OgHFue4uPhHNueIiQh3ZudYWPiXluc4KPi3xvcX+NjX9xb3yLjoJzbnmJj4V1bneHj4d3bnSEj4p6b3KBjot9cHF/jI2AcXB8i46Cc296iY6FdW93h46Hd291hY6Jem9zgo2KfHBygIyMfnFxfouNgXJwe4qNg3RveYiOhXZvd4aOhnhvdoSNiHpwdIONiXtwc4GMi31xcn+LjH9ycX2KjIFzcXuJjYN1cHmIjYR2cHiGjYZ4cHeFjYd5cHWDjIh7cXSCjIl8cXOAi4p9cnN/i4t/c3J9iouAdHJ8iYyBdXF7iIyDdXF6h4yEdnF5hoyFd3F4hYyGeHF3hIyGeXF2g4uHenJ1gouIe3J1gYuIfHJ0gIqJfXN0f4qJfnN0fomKf3RzfomKgHRzfYiKgHVzfIiKgXVzfIeKgnZze4eKgnZze4aKg3dzeoaKg3dzeoaKg3hzeYWKhHhzeYWKhHlzeYSKhHlzeISKhXlzeISKhXpzeIOKhXpzeIOKhXpzeIOKhXp0eIOJhXp0eIKJhXt0eIKJhXt0eIKJhXt0eIKJhXt0eIKJhXt0eIKJhXt0eIKJhXt0eIKJhXt0eIKJhXt0eIKJhXt1eIKIhHt1eYOIhHp1eYOIhHp1eYOIhHp1eYOIhHp1eoOIg3p1eoOIg3l1eoSIg3l1e4SIgnl1e4SIgnl2e4SHgXh2fIWHgXh2fIWHgHh2fYWHgHh2fYWGgHh3foaGf3d3foaGfnd3f4aGfnd4f4aFfXd4gIaFfXd5gIaEfHd5gYaEfHd6goaDe3d6goaDe3d7g4aCend7g4aBend8hIaBeXd9hIaAeXh9hIV/eHh+hYV/eHh/hYR+eHmAhYR9eHmAhYN8eHqBhYN8eHuChYJ7eHuChYF6eHyDhYB6eH2DhYB5eH6EhH95eX6EhH55eX+Eg315eoCEg315e4GFgnx5e4GEgXt5fIKEgHt5fYOEgHp5foOEf3p6f4ODfnl6f4SDfXl7gISCfHl8gYSBfHl8goSAe3l9goN/e3p+g4N/enp/g4J+enuAg4J9enuAg4F8enyBg4B8en2Cg4B7en6Cg397e3+Cgn56e3+DgX16fICDgX16fYGDgHx7fYGCf3t7foKCfnt7f4KBfnt8gIKBfXt9gIKAfHt9gYJ/fHt+gYJ/fHx/goF+e3x/goF9e32AgoB9e32Bgn98fH6BgX98fH+BgX58fH+BgH18fYCBgH18foCBf3x8foGBfnx9f4GAfnx9f4GAfXx+gIF/fXx+gIB/fX1/gIB+fX1/gIB+fX6AgH99fX6AgH99fX6AgH59fX+AgH59fn+Af359foCAf319foCAfn1+f4B/fn1+f4B/fn1+f4B/fn5+f39+fn5/f39+fn5/f39+fn5/f39+fn9/f35+fn9/f35+fn9/f35+fn9/fn5+f39/fn5+f39/fn5+f39/fn4='
                };
                if (sounds[type]) {
                    const a = new Audio(sounds[type]);
                    a.volume = this.volume;
                    a.play().catch(() => {});
                }
            } catch(e) {}
        },
        showAboutDialog: function(appDetails) {
            const doc = topScopeSystem.document;
            const dialogId = 'about-' + appDetails.name.replace(/\s+/g, '-').toLowerCase();
            
            let existing = doc.getElementById(dialogId);
            if (existing) {
                // Focus existing dialog if already open
                const dialogWindow = existing.querySelector('.about-dialog');
                if (dialogWindow) {
                    dialogWindow.style.zIndex = parseInt(dialogWindow.style.zIndex || 999999) + 1;
                    dialogWindow.classList.remove('window-opening');
                    // Trigger a small animation to show it was focused
                    dialogWindow.style.transform = 'translate(-50%, -50%) scale(1.05)';
                    setTimeout(() => { dialogWindow.style.transform = 'translate(-50%, -50%) scale(1)'; }, 100);
                }
                return;
            }

            const overlay = doc.createElement('div');
            overlay.id = dialogId;
            overlay.className = 'about-overlay';
            
            const websiteHtml = appDetails.website ? `
                <hr style="width:100%; border:0; border-top:2px solid #808080; border-bottom:2px solid #fff; margin:0;">
                <p style="margin:0;"><a href="https://github.com/KhannaSparsh0001" target="_blank" style="color:blue;">Website / GitHub</a></p>
            ` : '';

            const iconHtml = appDetails.icon ? `<img src="${appDetails.icon}" style="width:32px; height:32px; margin-right:15px; image-rendering:pixelated;" alt="Icon">` : '';

            overlay.innerHTML = `
                <div class="about-dialog game-window window-opening" style="z-index:999999; position:absolute; top:30%; left:35%; width:360px; resize:both; overflow:auto; font-family:'MS Sans Serif', Tahoma, Verdana, sans-serif; font-size:12px; background:#c0c0c0; border:2px solid; border-color:#dfdfdf #000 #000 #dfdfdf;">
                    <div class="retro-window-header" style="cursor:default;">
                        <span>About ${appDetails.name}</span>
                        <button class="close-about">X</button>
                    </div>
                    <div style="padding:15px; text-align:left; display:flex; flex-direction:column; gap:12px;">
                        
                        <div style="display:flex; align-items:flex-start;">
                            ${iconHtml}
                            <div style="display:flex; flex-direction:column; gap:4px;">
                                <h2 style="margin:0; font-size:16px;">${appDetails.name}</h2>
                                <p style="margin:0;">Version ${appDetails.version || '1.0'}</p>
                                <p style="margin:0;">${appDetails.description}</p>
                            </div>
                        </div>

                        <hr style="width:100%; border:0; border-top:2px solid #808080; border-bottom:2px solid #fff; margin:0;">
                        
                        <div style="display:flex; flex-direction:column; gap:4px; text-align:center;">
                            <p style="margin:0;">Developed by</p>
                            <p style="margin:0; font-weight:bold;">${appDetails.developer || 'Sparsh Khanna'}</p>
                        </div>

                        ${websiteHtml}

                        <hr style="width:100%; border:0; border-top:2px solid #808080; border-bottom:2px solid #fff; margin:0;">

                        <div style="text-align:center;">
                            <p style="margin:0;">Copyright &copy; ${appDetails.copyright || new Date().getFullYear()}</p>
                        </div>

                        <hr style="width:100%; border:0; border-top:2px solid #808080; border-bottom:2px solid #fff; margin:0;">

                        <div style="display:flex; justify-content:center; margin-top:5px;">
                            <button class="close-about" style="width:80px; padding:4px; cursor:pointer;">OK</button>
                        </div>
                    </div>
                </div>
            `;
            doc.body.appendChild(overlay);
            
            if (topScopeSystem.SystemAPI) {
                topScopeSystem.SystemAPI.playSound('open');
            }

            const closeBtns = overlay.querySelectorAll('.close-about');
            closeBtns.forEach(btn => {
                btn.onclick = () => {
                    if (topScopeSystem.SystemAPI) {
                        topScopeSystem.SystemAPI.playSound('close');
                    }
                    const dialogWindow = overlay.querySelector('.about-dialog');
                    if (dialogWindow) {
                        dialogWindow.classList.remove('window-opening');
                        dialogWindow.classList.add('window-closing');
                        setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 150);
                    } else {
                        overlay.remove();
                    }
                };
            });
            
            // Make it draggable
            const dialogWindow = overlay.querySelector('.about-dialog');
            const header = overlay.querySelector('.retro-window-header');
            if (dialogWindow && header) {
                let isDragging = false;
                let startX, startY, initialLeft, initialTop;

                header.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    // convert css left/top to numbers
                    initialLeft = parseInt(window.getComputedStyle(dialogWindow).left || 0, 10) || dialogWindow.offsetLeft;
                    initialTop = parseInt(window.getComputedStyle(dialogWindow).top || 0, 10) || dialogWindow.offsetTop;
                    dialogWindow.style.zIndex = parseInt(dialogWindow.style.zIndex || 999999) + 1;
                    
                    // add an invisible blocking overlay to iframes so drag doesn't get lost
                    const iframeBlocker = doc.createElement('div');
                    iframeBlocker.id = 'iframe-drag-blocker';
                    iframeBlocker.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:999998; cursor:default;';
                    doc.body.appendChild(iframeBlocker);
                });

                doc.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    dialogWindow.style.left = (initialLeft + dx) + "px";
                    dialogWindow.style.top = (initialTop + dy) + "px";
                });

                doc.addEventListener('mouseup', () => {
                    if (isDragging) {
                        isDragging = false;
                        const blocker = doc.getElementById('iframe-drag-blocker');
                        if (blocker) blocker.remove();
                    }
                });
            }

            // Allow escape key to close
            const escListener = (e) => {
                if (e.key === 'Escape') {
                    if (doc.getElementById(dialogId)) {
                        closeBtns[0].click();
                    }
                    doc.removeEventListener('keydown', escListener);
                }
            };
            doc.addEventListener('keydown', escListener);
        }
    };
}

window.SystemAPI = topScopeSystem.SystemAPI;
