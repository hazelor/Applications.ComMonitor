import os
import sys
import shutil

delDir = os.getcwd()
delList = os.listdir(delDir)
for item in delList:
    debugFilePath = os.path.join(delDir, item) + '/bin/debug'
    if os.path.isdir(debugFilePath):
        shutil.rmtree(debugFilePath)
    debugFilePath = os.path.join(delDir, item) + '/obj/debug'
    if os.path.isdir(debugFilePath):
        shutil.rmtree(debugFilePath)
    releaseFilePath = os.path.join(delDir, item) + '/bin/release'
    if os.path.isdir(releaseFilePath):
        shutil.rmtree(releaseFilePath)
    releaseFilePath = os.path.join(delDir, item) + '/obj/release'
    if os.path.isdir(releaseFilePath):
        shutil.rmtree(releaseFilePath)
