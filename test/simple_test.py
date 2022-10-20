# simple selenium test script
from logging import captureWarnings
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import UnexpectedAlertPresentException, WebDriverException
import subprocess
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service 
from time import sleep
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# import TimeUnit
from selenium.webdriver.support.ui import WebDriverWait

class imGeniusObj:

    def __init__(self):
        # CONFIG
        self.email = "bigpp@gmail.com"
        self.password = "password"
        options = Options()
        options.add_experimental_option("detach", True)
        options.add_argument("--start-maximized")
        # self.driver = webdriver.Chrome(executable_path=ChromeDriverManager().install(), chrome_options=options)
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        subprocess.Popen("npx kill-port 3000", shell=True)
    
    def popup(self):
        driver = self.driver
        test_case = "Popup"
        driver.execute_script(f'window.alert("{test_case}")')

    def kill_port(self):
        subprocess.Popen("npx kill-port 3000", shell=True)

    def login(self):
        email = self.email
        password = self.password
        driver = self.driver
        test_case = "Login"

        # subprocess.Popen("npx kill-port 3000", shell=True)
        # run 2 different command in the same time
        sleep(1)
        subprocess.Popen(["python", "./backend/manage.py", "runserver"],shell=True)
        sleep(1)
        subprocess.Popen('npm run dev', shell=True)   
        sleep(1)
        # change to the real url once deployment done
        driver.get("http://localhost:3000")

        # find element by id and type login & password
        # https://selenium-python.readthedocs.io/
        driver.find_element(By.ID, "email").send_keys(email)
        driver.find_element(By.ID, "password").send_keys(password)
        # sleep(1)
        # driver.implicitly_wait(1)
        driver.find_element(By.XPATH, '//*[@id="__next"]/main/div/div/div/div/div/div/div/form/div/div/div[3]/button').click()
         
        elem = WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/main/div/div/div/div/div/div[2]'))) 
        driver.execute_script(f'window.alert("{test_case} use case SUCCESS")')
        
if __name__ == '__main__':
    genius = imGeniusObj()
    genius.login()
    # genius.kill_port()