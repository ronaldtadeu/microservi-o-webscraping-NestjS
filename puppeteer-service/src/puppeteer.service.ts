import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  async scrapeAndSaveProduct(username: string, password: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on('dialog', async dialog => {
      console.log('Alerta detectado:', dialog.message());
      await dialog.dismiss();
    });

    try {
      await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle2' });

      await page.type('#user-name', username);
      await page.type('#password', password);
      await page.click('#login-button');

      const loginError = await page.waitForSelector('.error-message-container', { timeout: 5000 }).catch(() => null);

      if (loginError) {
        const errorMessage = await loginError.evaluate(el => el.textContent);
        return this.handleLoginError(username, errorMessage);
      }

      await page.waitForSelector('.inventory_list', { timeout: 60000 });

      const products = await page.$$eval('.inventory_item', items => {
        return items.map(item => ({
          name: item.querySelector('.inventory_item_name').textContent,
          price: parseFloat(item.querySelector('.inventory_item_price').textContent.replace('$', '')),
        }));
      });

      const mostExpensiveProduct = products.reduce((prev, current) => (prev.price > current.price) ? prev : current);
      const cheapestProduct = products.reduce((prev, current) => (prev.price < current.price) ? prev : current);

      return {
        products,
        mostExpensiveProduct,
        cheapestProduct,
      };
    } catch (error) {
      console.error('Erro durante o scraping:', error);
      return { error: 'Erro ao buscar os produtos' };
    } finally {
      await browser.close();
    }
  }

  async tryLogin(username: string, password: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on('dialog', async dialog => {
      console.log('Alerta detectado:', dialog.message());
      await dialog.dismiss();
    });

    try {
      await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle2' });

      await page.type('#user-name', username);
      await page.type('#password', password);
      await page.click('#login-button');

      const loginError = await page.waitForSelector('.error-message-container', { timeout: 5000 }).catch(() => null);

      if (loginError) {
        const errorMessage = await loginError.evaluate(el => el.textContent);
        return this.handleLoginError(username, errorMessage);
      }

      await page.waitForSelector('.inventory_list', { timeout: 60000 });

      const products = await page.$$eval('.inventory_item', items => {
        return items.map(item => ({
          name: item.querySelector('.inventory_item_name').textContent,
          price: parseFloat(item.querySelector('.inventory_item_price').textContent.replace('$', '')),
        }));
      });

      const mostExpensiveProduct = products.reduce((prev, current) => (prev.price > current.price ? prev : current));

      return {
        success: true,
        message: `Login successful for user ${username}.`,
        mostExpensiveProduct, 
      };

    } catch (error) {
      console.error(`Erro durante o login para o usuário ${username}:`, error);
      return { success: false, message: `Erro ao tentar login para o usuário ${username}.` };
    } finally {
      await browser.close();
    }
  }

  private handleLoginError(username: string, message: string) {
    switch (username) {
      case 'standard_user':
        return { error: 'Usuário padrão logado com sucesso.' };
      case 'locked_out_user':
        return { error: 'Este usuário está bloqueado.' };
      case 'problem_user':
        return { error: 'Este usuário encontrou um problema ao logar.' };
      case 'performance_glitch_user':
        return { error: 'O usuário com problemas de desempenho não pôde acessar.' };
      case 'error_user':
        return { error: 'Ocorreu um erro ao tentar logar com este usuário.' };
      case 'visual_user':
        return { error: 'Este usuário teve problemas visuais ao logar.' };
      default:
        return { error: 'Usuário desconhecido ou erro inesperado.' };
    }
  }
}
