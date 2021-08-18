import os
import pythonencrypt as pe


key = 'My Super Secret Password'

value = '''Vogon poetry is of course, the third worst in the universe.
The second worst is that of the Azgoths of Kria. During a recitation by their poet master Grunthos the Flatulent of his poem "Ode to a Small Lump of Green Putty I Found in My Armpit One Midsummer Morning" four of his audience died of internal haemorrhaging and the president of the Mid-Galactic Arts Nobbling Council survived by gnawing one of his own legs off. Grunthos was reported to have been "disappointed" by the poem's reception, and was about to embark on a reading of his 12-book epic entitled "My Favourite Bathtime Gurgles" when his own major intestine, in a desperate attempt to save humanity, leapt straight up through his neck and throttled his brain.
The very worst poetry of all perished along with its creator, Paul Neil Milne Johnstone of Redbridge, in the destruction of the planet Earth. Vogon poetry is mild by comparison.
'''


## section to test code. 

output = pe._encrypt(key,value) 
print('\nPython encrypt:\n', output)

decrypt = pe._decrypt(key,output)
print('\nPython decrypt:\n', decrypt)

cmd = 'node nodedecrypt ---key "%s" --estr "%s"'%(key,output)
# print(cmd)
node = os.popen(cmd).read()
print('\n\nNode Decrypt:\n', node)
