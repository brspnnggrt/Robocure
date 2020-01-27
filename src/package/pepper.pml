<?xml version="1.0" encoding="UTF-8" ?>
<Package name="InteractiveLearning" format_version="4">
    <Manifest src="manifest.xml" />
    <BehaviorDescriptions>
        <BehaviorDescription name="behavior" src="saxophone" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="elephant" xar="behavior.xar" />
        <BehaviorDescription name="behavior" src="taichichuan" xar="behavior.xar" />
    </BehaviorDescriptions>
    <Dialogs />
    <Resources>
        <File name="epicsax" src="saxophone/epicsax.ogg" />
        <File name="elephant" src="elephant/elephant.ogg" />
        <File name="swiftswords_ext" src="taichichuan/swiftswords_ext.mp3" />
        <File name="taichimove" src="taichichuan/taichimove.pmt" />
        <!-- Learning module files will be added here by build process -->
        <!-- example resource: <File name="index" src="html/index.html" /> -->
    </Resources>
    <Topics />
    <IgnoredPaths />
    <Translations />
</Package>
