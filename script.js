const bal_acc = document.getElementById("bal_acc")
const bal_cash = document.getElementById("bal_cash")
const process_type = document.getElementById("process_type")
const process_amt = document.getElementById("process_amt")
const log = document.getElementById("log")

const processBtn = document.getElementById('process-btn')
const convertBtn = document.getElementById('convert-btn')
const resetBtn = document.getElementById('reset-btn')

let curr_id = 1
let curr_acc = Number(bal_acc.value) || 0
let curr_cash = Number(bal_cash.value) || 0

function changeBalance() {
    curr_acc = Number(bal_acc.value) || 0
    curr_cash = Number(bal_cash.value) || 0
    showBalance()
}

function proceedOperation() {
    const amt = Number(process_amt.value)
    if (!amt || amt <= 0) { addLog('Invalid amount'); return }

    if (process_type.value === 'deposit') {
        if (curr_cash >= amt) {
            curr_acc += amt
            curr_cash -= amt
            addLog(`Deposited ${amt} from cash to account.`)
            showBalance()
        } else {
            addLog("Couldn't deposit entered balance. (Insufficient cash)")
        }
    } else if (process_type.value === 'withdraw') {
        if (curr_acc >= amt) {
            curr_acc -= amt
            curr_cash += amt
            addLog(`Withdrew ${amt} from account to cash.`)
            showBalance()
        } else {
            addLog("Couldn't withdraw entered balance. (Insufficient account)")
        }
    }
}

function showBalance() {
    bal_acc.value = Number(curr_acc)
    bal_cash.value = Number(curr_cash)
    addLog(`Current account balance: ${curr_acc}, Current cash balance: ${curr_cash}`)
}

function addLog(text) {
    const time = new Date().toLocaleTimeString()
    log.value = `${curr_id++}, [${time}] ${text}\n${log.value}`
}

function convertBalance() {
    const inAmt = Number(document.getElementById('con_in').value) || 0
    const direction = document.getElementById('con_intype').value
    if (inAmt <= 0) { addLog('Conversion amount must be > 0'); return }

    // simple fixed-rate conversion for demo purposes
    const rate = 36.5
    if (direction === 'usd') {
        const out = +(inAmt * rate).toFixed(2)
        document.getElementById('con_out').value = out
        addLog(`Converted ${inAmt} USD → ${out} THB`)
    } else {
        const out = +(inAmt / rate).toFixed(2)
        document.getElementById('con_out').value = out
        addLog(`Converted ${inAmt} THB → ${out} USD`)
    }
}

function resetBalances() {
    curr_acc = 1000
    curr_cash = 500
    addLog('Balances reset to default values')
    showBalance()
}

// wire buttons
if (processBtn) processBtn.addEventListener('click', proceedOperation)
if (convertBtn) convertBtn.addEventListener('click', convertBalance)
if (resetBtn) resetBtn.addEventListener('click', resetBalances)

// keep inputs in sync when manually edited
bal_acc.addEventListener('change', changeBalance)
bal_cash.addEventListener('change', changeBalance)

// initial render
showBalance()