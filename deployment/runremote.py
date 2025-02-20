#! /usr/bin/env python
# -*- encoding: UTF-8 -*-

"""Example: Use executeJS Method"""

import qi
import argparse
import sys
import os


def main(session, args):

    # Get the service ALTabletService.
    tabletService = session.service("ALTabletService")

    try:
        # Display a local web page located in boot-config/html folder
        # The ip of the robot from the tablet is 198.18.0.1
        tabletService.showWebview("http://{0}:8080/dist".format(args.remotehost))

    except Exception, e:
        print "Error was:", e

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--ip", type=str, default=os.environ["npm_package_config_ip"], help="Robot IP address. On robot or Local Naoqi: use '127.0.0.1'.")
    parser.add_argument("--remotehost", type=str, default=os.environ["npm_package_config_speechserverip"], help="URL of the hosted content to show on the webpage")
    parser.add_argument("--port", type=int, default=9559, help="Naoqi port number")
    args = parser.parse_args()
    session = qi.Session()

    try:
        session.connect("tcp://" + args.ip + ":" + str(args.port))
    except RuntimeError:
        print ("Can't connect to Naoqi at ip \"" + args.ip + "\" on port " + str(args.port) +".\n" "Please check your script arguments. Run with -h option for help.")
        sys.exit(1)

    main(session, args)