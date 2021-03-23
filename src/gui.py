'''The Graphical Interface for A* search

This file handles anything to do with the graphical user interface for the A* search 
'''

import pygame
import a_star

class color():
    '''
    A helpful enum for having color constants easily accessible. The constants store 
    the RGB codes for each color.

    colors in class:
    RED
    GREEN
    BLUE
    YELLOW
    WHITE
    BLACK
    PURPLE
    ORANGE
    GREY
    TURQUOISE
    '''
    def __init__(self):
        self.RED = (255, 0, 0);
        self.GREEN = (0, 255, 0)
        self.BLUE = (0, 0, 255)
        self.YELLOW = (255, 255, 0)
        self.WHITE = (255, 255, 255)
        self.BLACK = (0, 0, 0)
        self.PURPLE = (128, 0, 128)
        self.ORANGE = (255, 165, 0)
        self.GREY = (128, 128, 128)
        self.TURQOUISE = (64, 224, 208)

class GUI():
    def __init__(self):
        self.colors = color()
        self.WIDTH = 800
        self.WIN = pygame.display.set_mode((self.WIDTH, self.WIDTH))
        pygame.display.set_caption('A Star Path Finding Visualizer')

    def make_grid(self):
        '''
        Creates the base grid for the visualization based on the user input.
        '''


# for production, remove in final version of code
if (__name__ == '__main__'):
    game = GUI()