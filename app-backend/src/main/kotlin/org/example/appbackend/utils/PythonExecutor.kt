package org.example.appbackend.utils

import java.io.File

fun executePythonScript(email: String, name: String, msg: String, actionName: String) {
    val pb = ProcessBuilder("python", "sendEmail.py", email, name, msg, actionName)
    pb.directory(File("./app-backend/python-scripts/"))
    pb.start()
}

const val NEW_LOGIN_MSG_TEXT = """
            <p>We noticed a new login to your Emotional Support App account.</p>
            <p>If this was you, please ignore this message.</p>
            <p>If not, please contact us promptly to secure your account.</p>
"""

const val SIGN_UP_MSG_TEXT = """
            <p>Congratulations on signing up for Emotional Support App!</p>
            <p>We’re thrilled to have you on board and are here to support you every step of the way.</p>
            <p>Feel free to explore and make the most out of our features to support your well-being.</p>
"""

class ActionNames {
    enum class Actions(val value: String) {
        LOGIN("NEW LOGIN DETECTED!"),
        SIGN_UP("SIGN UP!")
    }
}