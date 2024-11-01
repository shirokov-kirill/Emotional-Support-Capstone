package org.example.appbackend.utils

import java.io.File

fun executePythonScript(email: String, name: String){
        val pb = ProcessBuilder("python3", "sendEmail.py", email, name)
        pb.directory(File("./app-backend/python-scripts/"))
        pb.start()
}
