// Display checkin time

const checkin_display = root_element.querySelector('#checkin-display');

function update_checkin_display() {
    // const checkin_time = new Date();
    // checkin_display.textContent = checkin_time.toLocaleString();
    checkin_display.textContent = 'None'
}

update_checkin_display()

// Display checkout time

const checkout_display = root_element.querySelector('#checkout-display');

function update_checkout_display() {
    // const checkout_time = new Date();
    // checkout_display.textContent = checkout_time.toLocaleString();
    checkout_display.textContent = 'None'
}

update_checkout_display()

// Button

const CHECKIN_API_URL = '/api/method/hrms.hr.doctype.employee_checkin.employee_checkin.add_log_based_on_employee_field'

const checkin_button = root_element.querySelector('#checkin-button');

function checkin() {
    const now = new Date()
    const now_timestamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.000000`
    const checkin_params = new URLSearchParams({
        timestamp: now_timestamp,
        employee_fieldname: 'user_id',
        employee_field_value: frappe.session.user
    })
    return fetch(`${CHECKIN_API_URL}?${checkin_params}`, {
        method: 'post',
        headers: {
            "X-Frappe-CSRF-Token": frappe.csrf_token
        }
    })
}

checkin_button.addEventListener('click', () => {
    checkin().then(() => {
        frappe.show_alert({message: 'Checkin success', indicator: 'green'})
        update_checkin_display()
        update_checkout_display()
    })
});